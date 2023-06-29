import { 
	CommerceAPI, 
	CommonArgs, 
	CustomerGroup, 
	GetProductsArgs, 
	PaginationArgs, 
	Product, 
} from '../../../../common'
import { 
	CodecPropertyConfig, 
	CommerceCodecType, 
	CommerceCodec 
} from '../../core'
import { getProductsArgError, logResponse } from '../../common'
import {
	GqlError,
	GqlResponse, 
	Paginated,
	fromGqlErrors
} from '../../../../common/graphql'
import { StringProperty } from '../../../cms-property-types'
import axios, { AxiosInstance } from 'axios'
import { CodecError, CodecErrorType, catchAxiosErrors } from '../../codec-error'
import {
	ShopifyCollection, 
	ShopifyCollections, 
	ShopifyProduct, 
	ShopifyProductByID, 
	ShopifyProductsByCollection, 
	ShopifyProductsByQuery,
	ShopifySegment,
	ShopifySegments,
} from './types'
import { 
	collections, 
	productById, 
	productsByCategory, 
	productsByQuery, 
	segments 
} from './queries'
import { 
	mapCategory, 
	mapCustomerGroup, 
	mapProduct
} from './mappers'
import { GetPageResultCursor, paginateCursor, paginateCursorArgs, getPageGql } from '../../pagination'

const PAGE_SIZE = 100

/**
 * Shopify codec configuration.
 */
type CodecConfig = {

	/** Storefront access token */
	access_token: StringProperty,

	/** Admin access token */
	admin_access_token: StringProperty,

	/** API version */
	version: StringProperty,

	/** Site identifier */
	site_id: StringProperty
}

/**
 * Commerce Codec Type that integrates with Shopify.
 */
export class ShopifyCommerceCodecType extends CommerceCodecType {

	/**
	 * @inheritdoc
	 */
	get vendor(): string {
		return 'shopify'
	}

	/**
	 * @inheritdoc
	 */
	get properties(): CodecConfig {
		return {
			access_token:  {
				title: 'access token',
				type: 'string',
				minLength: 1
			},
			admin_access_token:  {
				title: 'admin access token',
				type: 'string',
				minLength: 1
			},
			version:  {
				title: 'version',
				type: 'string',
				minLength: 1
			},
			site_id:  {
				title: 'site id',
				type: 'string',
				minLength: 1
			}
		}
	}

	/**
	 * @inheritdoc
	 */
	async getApi(config: CodecPropertyConfig<CodecConfig>): Promise<CommerceAPI> {
		return await new ShopifyCommerceCodec(config).init(this)
	}
}

/**
 * Commerce Codec that integrates with Shopify.
 */
export class ShopifyCommerceCodec extends CommerceCodec {
	declare config: CodecPropertyConfig<CodecConfig>
	apiClient: AxiosInstance
	adminApiClient: AxiosInstance

	/**
	 * @inheritdoc
	 */
	async init(codecType: CommerceCodecType): Promise<CommerceCodec> {
		this.apiClient = axios.create({
			baseURL: `https://${this.config.site_id}.myshopify.com/api/${this.config.version}`,
			headers: {
				'X-Shopify-Storefront-Access-Token': this.config.access_token
			}
		})
		this.adminApiClient = axios.create({
			baseURL: `https://${this.config.site_id}.myshopify.com/admin/api/${this.config.version}`,
			headers: {
				'X-Shopify-Access-Token': this.config.admin_access_token
			}
		})

		return await super.init(codecType)
	}

	/**
	 * Make a request to the Shopify GraphQL API.
	 * @param query The GraphQL query string
	 * @param variables Variables to use with the GraphQL query
	 * @param isAdmin Whether the admin credentials must be used or not
	 * @returns GraphQL response data
	 */
	async gqlRequest<T>(query: string, variables: any, isAdmin = false): Promise<T> {
		const url = 'graphql.json'
		const result: GqlResponse<T> = await logResponse('post', url, (await catchAxiosErrors(async () =>
		{
			if (isAdmin) {
				return await this.adminApiClient.post(url, {
					query,
					variables
				})
			} else {
				return await this.apiClient.post(url, {
					query,
					variables
				})	
			}
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
		const shopifyCollections = await paginateCursor(
			getPageGql<ShopifyCollections, ShopifyCollection>(this.gqlRequest.bind(this), collections, {}, response => response.collections),
			PAGE_SIZE)

		this.categoryTree = shopifyCollections.data.map(collection => mapCategory(collection))
	}

	/**
	 * Get a Shopify product by ID.
	 * @param id The ID of the product to fetch
	 * @returns The shopify product
	 */
	async getProductById(id: string): Promise<ShopifyProduct> {
		return (await this.gqlRequest<ShopifyProductByID>(productById, { id: 'gid://shopify/Product/' + id }))?.product ?? null
	}

	/**
	 * Get a list of all Shopify products that match the given keyword.
	 * @param keyword Keyword used to search products
	 * @param args Pagination arguments, new cursor and offset is written back into the object.
	 * @returns A list of all matching products
	 */
	async getProductsByKeyword(keyword: string, args: PaginationArgs): Promise<ShopifyProduct[]> {
		const query = keyword
		const shopifyProducts = await paginateCursorArgs(
			getPageGql<ShopifyProductsByQuery, ShopifyProduct>(this.gqlRequest.bind(this), productsByQuery, {query}, response => response.products),
			args,
			PAGE_SIZE)

		return shopifyProducts.data
	}

	/**
	 * Get a list of all Shopify products in the category with the given slug.
	 * @param slug The category slug
	 * * @param args Pagination arguments, new cursor and offset is written back into the object.
	 * @returns A list of all products in the category
	 */
	async getProductsByCategory(slug: string, args: PaginationArgs): Promise<ShopifyProduct[]> {
		const handle = slug
		const shopifyProducts = await paginateCursorArgs(
			getPageGql<ShopifyProductsByCollection, ShopifyProduct>(this.gqlRequest.bind(this), productsByCategory, {handle}, response => response.collection.products),
			args,
			PAGE_SIZE)

		return shopifyProducts.data
	}

	/**
	 * @inheritdoc
	 */
	async getProducts(args: GetProductsArgs): Promise<Product[]> {
		return (await this.getRawProducts(args)).map(mapProduct)
	}

	/**
	 * @inheritdoc
	 */
	async getRawProducts(args: GetProductsArgs): Promise<ShopifyProduct[]> {
		let products: ShopifyProduct[] = []

		if (args.productIds && args.productIds === '') {
			products = []
		} else if (args.productIds) {
			products = await Promise.all(
				args.productIds.split(',').map(this.getProductById.bind(this))
			)
		} else if (args.keyword) {
			products = await this.getProductsByKeyword(args.keyword, args)
		} else if (args.category) {
			products = await this.getProductsByCategory(args.category.slug, args)
		} else {
			throw getProductsArgError('getRawProducts')
		}

		return products
	}

	/**
	 * @inheritdoc
	 */
	async getCustomerGroups(args: CommonArgs): Promise<CustomerGroup[]> {
		const shopifySegments = await paginateCursor(
			getPageGql<ShopifySegments, ShopifySegment>(this.gqlRequest.bind(this), segments, {}, response => response.segments, true),
			PAGE_SIZE)

		return shopifySegments.data.map(segment => mapCustomerGroup(segment))
	}
}

export default ShopifyCommerceCodecType
// registerCodec(new ShopifyCommerceCodecType())