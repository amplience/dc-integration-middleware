import { APIConfiguration, APIProperties, CommerceAPI, CommonArgs, GetProductsArgs, Identifiable, Product } from '../../../../common'
import _ from 'lodash'
import { CodecPropertyConfig, CommerceCodecType, CommerceCodec } from '../../core'
import { StringProperty } from '../../../cms-property-types'
import axios, { AxiosInstance } from 'axios'
import { mapCategory, mapProduct } from './mappers'
import { CodecError, CodecErrorType, catchAxiosErrors } from '../../codec-error'
import { getProductsArgError, logResponse } from '../../common'
import { getPageByQueryAxios, getPageGql, paginateBlankArgs, paginateCursorArgs } from '../../pagination'
import { GqlResponse, fromGqlErrors } from '../../../../common/graphql'
import { BigCommerceCategoryTreeResponse, BigCommerceProductCategoryResponse, BigCommerceProductIdsResponse, BigCommerceProductQueryResponse, categories, productsByIds, productsByQuery } from './queries'
import { BigCommerceCorsProduct } from './types'

const PAGE_SIZE = 50

/**
 * BigCommerce Codec config properties
 */
type CodecConfig = {
	api_token: StringProperty
	site_id: StringProperty
}

/**
 * Commerce Codec Type that integrates with BigCommerce.
 */
export class BigCommerceCorsCommerceCodecType extends CommerceCodecType {
	/**
	 * @inheritdoc
	 */
	get vendor(): string {
		return 'bigcommerce-cors'
	}

	/**
	 * @inheritdoc
	 */
	get properties(): CodecConfig {
		return {
			api_token: {
				title: 'API Token',
				type: 'string',
				minLength: 1
			},
			site_id: {
				title: 'Site ID',
				type: 'string',
				minLength: 1
			}
		}
	}

	/**
	 * @inheritdoc 
	 */
	async getApi(config: CodecPropertyConfig<CodecConfig>): Promise<CommerceAPI> {
		return await new BigCommerceCorsCommerceCodec(config).init(this)
	}
}

/**
 * Commerce Codec that integrates with BigCommerce.
 */
export class BigCommerceCorsCommerceCodec extends CommerceCodec {
	declare config: CodecPropertyConfig<CodecConfig>

	apiClient: AxiosInstance

	getPage = getPageByQueryAxios('page', 'limit', (data) => data.meta.pagination.total, 'data', (page) => page + 1)

	/**
	 * @inheritdoc
	 */
	async init(codecType: CommerceCodecType): Promise<CommerceCodec> {
		this.apiClient = axios.create({
			baseURL: `https://${this.config.site_id}.mybigcommerce.com`,
			headers: {
				'Authorization': `Bearer ${this.config.api_token}`
			}
		})

		return await super.init(codecType)
	}

	/**
	 * Make a request to the Bigcommerce GraphQL API.
	 * @param query The GraphQL query string
	 * @param variables Variables to use with the GraphQL query
	 * @returns GraphQL response data
	 */
	async gqlRequest<T>(query: string, variables: any): Promise<T> {
		const url = 'graphql'
		const result: GqlResponse<T> = await logResponse('post', url, (await catchAxiosErrors(async () =>
		{
			return await this.apiClient.post(url, {
				query,
				variables
			})
		}
		)).data)

		if (result.data == null && result.errors) {
			throw new CodecError(CodecErrorType.ApiGraphQL, fromGqlErrors(result.errors))
		}

		return result.data
	}

	/**
	 * @inheritdoc
	 */
	async cacheCategoryTree(): Promise<void> {
		this.categoryTree = (await this.gqlRequest<BigCommerceCategoryTreeResponse>(categories, {})).site.categoryTree.map(mapCategory)
	}

	/**
	 * @inheritdoc
	 */
	async getProducts(args: GetProductsArgs): Promise<Product[]> {
		return (await this.getRawProducts(args, 'getProducts')).map(mapProduct)
	}

	/**
	 * Ensures a given array of identifiable objects has matching position to a list of IDs.
	 * Missing items are replaced with null.
	 * @param ids List of IDs
	 * @param items List of items
	 * @returns Items in the order of the specified ID list
	 */
	mapIdentifiers = (ids: string[], items: BigCommerceCorsProduct[]): (BigCommerceCorsProduct | null)[] => {
		return ids.map(id => items.find(item => item && item.entityId == Number(id)) ?? null)
	}

	/**
	 * @inheritdoc
	 */
	async getRawProducts(args: GetProductsArgs, method = 'getRawProducts'): Promise<BigCommerceCorsProduct[]> {
		let products: BigCommerceCorsProduct[] = []
		if (args.productIds && args.productIds === '') {
			products = []
		} else if (args.productIds) {
			const ids = args.productIds.split(',')
			const response = await this.gqlRequest<BigCommerceProductIdsResponse>(productsByIds, { ids })

			products = this.mapIdentifiers(ids, response.site.products.edges.map(edge => edge.node))
		} else if (args.keyword) {
			const query = args.keyword
			const shopifyProducts = await paginateCursorArgs(
				getPageGql<BigCommerceProductQueryResponse, BigCommerceCorsProduct>(
					this.gqlRequest.bind(this),
					productsByQuery,
					{query},
					response => response.site.search.searchProducts.products),
				args,
				PAGE_SIZE)
	
			return shopifyProducts.data
		} else if (args.category && args.category.id === '') {
			products = paginateBlankArgs(args)
		} else if (args.category) {
			const shopifyProducts = await paginateCursorArgs(
				getPageGql<BigCommerceProductCategoryResponse, BigCommerceCorsProduct>(
					this.gqlRequest.bind(this),
					productsByQuery,
					{id: args.category.id},
					response => response.site.category.products),
				args,
				PAGE_SIZE)
	
			return shopifyProducts.data
		} else {
			throw getProductsArgError(method)
		}
		return products
	}

	/**
	 * @inheritdoc 
	 */
	async getCustomerGroups(args: CommonArgs): Promise<Identifiable[]> {
		return [] //(await this.fetch('/v2/customer_groups')).map(mapCustomerGroup)
	}
}

export default BigCommerceCorsCommerceCodecType
// registerCodec(new BigCommerceCorsCommerceCodecType())