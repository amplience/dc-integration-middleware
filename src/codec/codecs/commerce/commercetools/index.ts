import { 
	Category, 
	ClientCredentialProperties, 
	ClientCredentialsConfiguration, 
	CommerceAPI, 
	CommonArgs, 
	GetProductsArgs, 
	Identifiable, 
	OAuthRestClient, 
	OAuthRestClientInterface, 
	Product 
} from '../../../../common'
import _ from 'lodash'
import { CodecPropertyConfig, CommerceCodecType, CommerceCodec } from '../../core'
import { StringProperty } from '../../../cms-property-types'
import { Attribute, CTCategory, CTProduct, CTVariant, Localizable } from './types'
import { formatMoneyString, quoteProductIdString } from '../../../../common/util'
import { getPageByQuery, paginate, paginateArgs } from '../../pagination'
import { catchAxiosErrors } from '../../codec-error'
import { getProductsArgError, mapIdentifiers } from '../../common'

/**
 * Commercetools Codec config properties
 */
type CodecConfig = ClientCredentialsConfiguration & {
    project: StringProperty
    scope: StringProperty
}

/**
 * Commerce Codec Type that integrates with Commercetools.
 */
export class CommercetoolsCodecType extends CommerceCodecType {

	/**
	 * @inheritdoc
	 */
	get vendor(): string {
		return 'commercetools'
	}

	/**
	 * @inheritdoc
	 */
	get properties(): CodecConfig {
		return {
			...ClientCredentialProperties,
			project: {
				title: 'project key',
				type: 'string',
				minLength: 1
			},
			scope: {
				title: 'scope',
				type: 'string',
				maxLength: 1000
			}
		}
	}

	/**
	 * @inheritdoc
	 */
	async getApi(config: CodecPropertyConfig<CodecConfig>): Promise<CommerceAPI> {
		return await new CommercetoolsCodec(config).init(this)
	}
}

/**
 * Convert a localized string using the locale in args.
 * @param localizable Localizable string object
 * @param args Method arguments that contain the language
 */
const localize = (localizable: Localizable, args: CommonArgs): string => {
	return localizable[args.language] ?? localizable.en ?? localizable[Object.keys(localizable).sort()[0]]
}

/**
 * Generates a method to get an attribute's value using the method arguments.
 * @param args Method arguments
 * @returns Method to get an attribute's value
 */
const getAttributeValue = (args: CommonArgs) => (attribute: Attribute): string => {
	if (typeof attribute.value === 'string') {
		return attribute.value
	}
	else if (typeof attribute.value.label === 'string') {
		return attribute.value.label
	}
	else if (attribute.value.label) {
		return localize(attribute.value.label, args)
	}
	else {
		return localize(attribute.value, args)
	}
}

/**
 * Find the local price of a variant from the method arguments.
 * @param variant Commercetools variant
 * @param args Method arguments
 * @returns The price of a variant
 */
const findPrice = (variant: CTVariant, args: CommonArgs): string => {
	const price = variant.prices &&
        (variant.prices.find(price => price.country === args.country && price.value.currencyCode === args.currency) ||
            variant.prices.find(price => price.value.currencyCode === args.currency) ||
            _.first(variant.prices))

	if (!price) {
		return '--'
	}
	else {
		return formatMoneyString((price.value.centAmount / Math.pow(10, price.value.fractionDigits)), args)
	}
}

/**
 * Map a Commercetools category to a common category.
 * @param category Commercetools category
 * @param categories All Commercetools categories
 * @param args Method arguments
 * @returns Category
 */
const mapCategory = (category: CTCategory, categories: CTCategory[], args: CommonArgs): Category => {
	return {
		id: category.id,
		name: localize(category.name, args),
		slug: localize(category.slug, args),
		children: categories.filter(cat => cat.parent?.id === category.id).map(cat => mapCategory(cat, categories, args)),
		products: [],
		showInMenu: true
	}
}

/**
 * Generates a method to map a Commercetools product to the common product type.
 * @param args Commercetools product
 * @returns Method to map a Commercetools product to a common one
 */
const mapProduct = (args: CommonArgs) => (product: CTProduct | null): (Product | null) => {
	if (!product) {
		return null
	}

	return {
		id: product.id,
		name: localize(product.name, args),
		slug: localize(product.slug, args),
		variants: _.isEmpty(product.variants) ? [product.masterVariant].map(mapVariant(args)) : product.variants.map(mapVariant(args)),
		categories: []
	}
}

/**
 * Generates a method to map a Commercetools variant to the common variant type.
 * @param args Commercetools variant
 * @returns Method to map a Commercetools variant to a common one
 */
const mapVariant = (args: CommonArgs) => (variant: CTVariant) => {
	return {
		id: `${variant.id}`,
		sku: variant.sku,
		images: variant.images,
		listPrice: findPrice(variant, args),

		// todo: get discounted price
		salePrice: findPrice(variant, args),
		attributes: _.zipObject(variant.attributes.map(a => a.name), variant.attributes.map(getAttributeValue(args)))
	}
}

/**
 * Commerce Codec that integrates with Commercetools.
 */
export class CommercetoolsCodec extends CommerceCodec {
	declare config: CodecPropertyConfig<CodecConfig>
	rest: OAuthRestClientInterface

	getPage = getPageByQuery('offset', 'limit', 'total', 'results')

	/**
	 * @inheritdoc
	 */
	async init(codecType: CommerceCodecType): Promise<CommerceCodec> {
		this.rest = OAuthRestClient({
			api_url: `${this.config.api_url}/${this.config.project}`,
			auth_url: `${this.config.auth_url}?grant_type=client_credentials`
		}, {

		}, {
			auth: {
				username: this.config.client_id,
				password: this.config.client_secret
			}
		})
		return await super.init(codecType)
	}

	/**
	 * @inheritdoc
	 */
	async cacheCategoryTree(): Promise<void> {
		const categories: CTCategory[] = (await paginate<CTCategory>(this.getPage(this.rest, '/categories'), 500)).result
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const args = this.config as any
		const rootCats: string[] = categories
			.filter(cat => cat.parent?.typeId !== 'category')
			.map(cat => localize(cat.slug, args))
		const mapped: Category[] = categories.map(cat => mapCategory(cat, categories, args))
		this.categoryTree = mapped.filter(cat => rootCats.includes(cat.slug))
	}

	/**
	 * Fetches data from the OAuth authenticated client.
	 * @param url URL to fetch data from
	 * @returns Response data
	 */
	async fetch(url: string) {
		return await catchAxiosErrors(async () => (await this.rest.get({ url })).results)
	}

	/**
	 * @inheritdoc
	 */
	async getRawProducts(args: GetProductsArgs, method = 'getRawProducts'): Promise<CTProduct[]> {
		let products: CTProduct[] = []

		if (args.productIds && args.productIds === '') {
			products = []
		} else if (args.productIds) {
			const ids = args.productIds.split(',')
			products = mapIdentifiers(ids, await paginateArgs(this.getPage(this.rest, `/product-projections/search?filter=id:${quoteProductIdString(args.productIds)}`), args))
		} else if (args.keyword) {
			products = (await paginateArgs<CTProduct>(this.getPage(this.rest, `/product-projections/search?text.en="${args.keyword}"`), args))
		} else if (args.category) {
			products = (await paginateArgs<CTProduct>(this.getPage(this.rest, `/product-projections/search?filter=categories.id: subtree("${args.category.id}")`), args))
		} else {
			throw getProductsArgError(method)
		}

		return products
	}

	/**
	 * @inheritdoc
	 */
	async getProducts(args: GetProductsArgs): Promise<Product[]> {
		return (await this.getRawProducts(args, 'getProducts')).map(mapProduct(args))
	}

	/**
	 * @inheritdoc
	 */
	async getCustomerGroups(args: CommonArgs): Promise<Identifiable[]> {
		return (await paginate<Identifiable>(this.getPage(this.rest, '/customer-groups'))).result
	}
}

export default CommercetoolsCodecType
// registerCodec(new CommercetoolsCodecType())