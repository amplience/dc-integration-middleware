import { CodecPropertyConfig, CommerceCodec, CommerceCodecType } from '../../core'
import axios from 'axios'
import { GetProductsArgs, PaginationArgs, Product } from '../../../../common'
import { mapProduct } from './mapper'
import { ScayleProduct } from './types'
import { getProductsArgError } from '../../common'
import { StringProperty } from '../../../../codec/cms-property-types'
import { getPageByQueryAxios, paginateArgs } from '../../pagination'

type CodecConfig = {
	access_token: StringProperty
	shop_id: StringProperty
	tenant_space: StringProperty
	api_version: StringProperty
}

export class ScayleCommerceCodecType extends CommerceCodecType {
	get vendor() {
		return 'scayle'
	}

	get properties(): CodecConfig {
		return {
			access_token: {
				title: 'shop access token',
				type: 'string',
				minLength: 1
			},
			shop_id: {
				title: 'shop id',
				type: 'string',
				minLength: 1
			},
			tenant_space: {
				title: 'shop tenant space',
				type: 'string',
				minLength: 1
			},
			api_version: {
				title: 'shop api version',
				type: 'string',
				minLength: 1
			}
		}
	}

	async getApi(config: CodecPropertyConfig<CodecConfig>) {
		return await new ScayleCommerceCodec(config).init(this)
	}
}

export class ScayleCommerceCodec extends CommerceCodec {
	declare config: CodecPropertyConfig<CodecConfig>

	getPage = getPageByQueryAxios(
		'page',
		'perPage',
		(data) => data.pagination.total,
		'entities',
		(page) => page + 1
	)

	async init(codecType: CommerceCodecType): Promise<CommerceCodec> {
		return await super.init(codecType)
	}

	getAxiosConfig() {
		return {
			method: 'get',
			baseURL: `https://${this.config.tenant_space}.storefront.api.scayle.cloud/${this.config.api_version}`,
			headers: {
				'X-Access-Token': this.config.access_token,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		}
	}

	getProductRequestParams(shopId) {
		return {
			shopId,
			with: 'images,priceRange,attributes:key(description|name|category)'
		}
	}

	async getProducts(args: GetProductsArgs): Promise<Product[]> {
		return (await this.getRawProducts(args)).map(mapProduct)
	}

	async getRawProducts(args: GetProductsArgs): Promise<ScayleProduct[]> {
		let products: ScayleProduct[] = []

		if (args.productIds) {
			products = await this.getProductByIds(args.productIds, args)
		} else if (args.keyword) {
			products = await this.getProductsByKeyword(args.keyword, args)
		} else if (args.category) {
			products = await this.getProductsByCategoryIds(args.category.id, args)
		} else {
			throw getProductsArgError('Scayle product request')
		}

		return products
	}

	async getProductByIds(ids: string, args: PaginationArgs): Promise<ScayleProduct[]> {
		const products = await paginateArgs<ScayleProduct>(
			this.getPage(axios, '/products', this.getAxiosConfig(), {
				...this.getProductRequestParams(this.config.shop_id),
				ids
			}),
			args
		)

		return products
	}

	async getProductsByKeyword(keyword: string, args: PaginationArgs): Promise<ScayleProduct[]> {
		const products = await paginateArgs<ScayleProduct>(
			this.getPage(axios, '/products', this.getAxiosConfig(), {
				...this.getProductRequestParams(this.config.shop_id),
				'filters[term]': keyword
			}),
			args
		)

		return products
	}

	async getProductsByCategoryIds(categoryIds: string, args: PaginationArgs): Promise<ScayleProduct[]> {
		const products = await paginateArgs<ScayleProduct>(
			this.getPage(axios, '/products', this.getAxiosConfig(), {
				...this.getProductRequestParams(this.config.shop_id),
				'filters[category]': categoryIds
			}),
			args
		)

		return products
	}
}

export default ScayleCommerceCodecType
