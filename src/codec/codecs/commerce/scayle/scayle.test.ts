import ScayleCodecType, { CodecConfig, ScayleCodec } from '.'
import { CodecPropertyConfig, CommerceCodec } from '../../core'
import nock, { Scope } from 'nock'
import {
	categorySingleResponse,
	productNotFoundResponse,
	productsFirstPageResponse,
	productsLastPageResponse,
	productsMultipleResponse,
	productsSingleResponse
} from './test/responses'

const config: CodecPropertyConfig<CodecConfig> = {
	access_token: 'test_access_token',
	shop_id: 'test_shop_id',
	tenant_space: 'dc-integration-middleware-test-demo',
	api_version: 'v1'
}

const assertIsProduct = (obj) => {
	expect(obj).toEqual(
		expect.objectContaining({
			id: expect.any(String),
			name: expect.any(String),
			slug: expect.any(String),
			categories: expect.any(Array),
			variants: expect.any(Array),
			longDescription: expect.any(String),
			shortDescription: expect.any(String)
		})
	)
}

const assertIsCategory = (obj) => {
	expect(obj).toEqual(
		expect.objectContaining({
			id: expect.any(String),
			name: expect.any(String),
			slug: expect.any(String),
			children: expect.any(Array),
			products: expect.any(Array),
			showInMenu: expect.any(Boolean)
		})
	)
}

describe('scayle integration', () => {
	let codec: CommerceCodec
	let nockScope: Scope

	beforeAll(async () => {
		nock.disableNetConnect()
	})

	afterAll(async () => {
		nock.enableNetConnect()
	})

	beforeEach(async () => {
		jest.resetAllMocks()

		nockScope = nock('https://dc-integration-middleware-test-demo.storefront.api.scayle.cloud/v1')
		codec = new ScayleCodec(config)
		await codec.init(new ScayleCodecType())
	})

	test('getProduct by ID', async () => {
		nockScope
			.get('/products')
			.query({
				shopId: 'test_shop_id',
				with: 'variants,images,priceRange,attributes:key(description|name|category)',
				ids: '1',
				page: '1',
				perPage: '20'
			})
			.reply(200, productsSingleResponse)

		const result = await codec.getProduct({
			id: '1'
		})

		expect(result.id).toEqual('1')
		assertIsProduct(result)
		expect(result).toMatchSnapshot()
	})

	test('getProduct by ID - not found', async () => {
		nockScope
			.get('/products')
			.query({
				shopId: 'test_shop_id',
				with: 'variants,images,priceRange,attributes:key(description|name|category)',
				ids: 'not_found',
				page: '1',
				perPage: '20'
			})
			.reply(200, productNotFoundResponse)

		const result = await codec.getProduct({
			id: 'not_found'
		})

		expect(result).toBeNull()
	})

	test('getProducts by IDs', async () => {
		nockScope
			.get('/products')
			.query({
				shopId: 'test_shop_id',
				with: 'variants,images,priceRange,attributes:key(description|name|category)',
				ids: '1,2',
				page: '1',
				perPage: '20'
			})
			.reply(200, productsMultipleResponse)

		const result = await codec.getProducts({
			productIds: '1,2'
		})

		expect(result.length).toEqual(2)
		assertIsProduct(result[0])
		expect(result[0].id).toEqual('1')
		assertIsProduct(result[1])
		expect(result[1].id).toEqual('2')
		expect(result).toMatchSnapshot()
	})

	test('getProducts by ID - partial results (one not found)', async () => {
		nockScope
			.get('/products')
			.query({
				shopId: 'test_shop_id',
				with: 'variants,images,priceRange,attributes:key(description|name|category)',
				ids: '1,not_found',
				page: '1',
				perPage: '20'
			})
			.reply(200, productsSingleResponse)

		const result = await codec.getProducts({
			productIds: '1,not_found'
		})

		expect(result.length).toEqual(2)
		assertIsProduct(result[0])
		expect(result[0].id).toEqual('1')
		expect(result[1]).toBeNull()
	})

	test('getProducts by keyword', async () => {
		nockScope
			.get('/products')
			.query({
				shopId: 'test_shop_id',
				with: 'variants,images,priceRange,attributes:key(description|name|category)',
				'filters[term]': 'shirt',
				page: '1',
				perPage: '20'
			})
			.reply(200, productsSingleResponse)

		const result = await codec.getProducts({
			keyword: 'shirt'
		})

		expect(result.length).toEqual(1)
		assertIsProduct(result[0])
		expect(result[0].id).toEqual('1')
		expect(result).toMatchSnapshot()
	})

	test('getProducts by keyword - paginated', async () => {
		nockScope
			.get('/products')
			.query({
				shopId: 'test_shop_id',
				with: 'variants,images,priceRange,attributes:key(description|name|category)',
				'filters[term]': 'shirt',
				page: '1',
				perPage: '2'
			})
			.reply(200, productsFirstPageResponse)
			.get('/products')
			.query({
				shopId: 'test_shop_id',
				with: 'variants,images,priceRange,attributes:key(description|name|category)',
				'filters[term]': 'shirt',
				page: '2',
				perPage: '2'
			})
			.reply(200, productsLastPageResponse)

		const result = await codec.getProducts({
			keyword: 'shirt',
			pageSize: 2
		})

		expect(result.length).toEqual(4)
		expect(result[0].id).toEqual('1')
		expect(result[1].id).toEqual('2')
		expect(result[2].id).toEqual('3')
		expect(result[3].id).toEqual('4')
		expect(result).toMatchSnapshot()
	})

	test('getProducts by category id', async () => {
		nockScope
			.get('/products')
			.query({
				shopId: 'test_shop_id',
				with: 'variants,images,priceRange,attributes:key(description|name|category)',
				'filters[category]': '1',
				page: '1',
				perPage: '20'
			})
			.reply(200, productsSingleResponse)

		const result = await codec.getProducts({
			category: {
				id: '1',
				name: 'test_category_name',
				slug: 'test_category_slug',
				children: [],
				products: [],
				showInMenu: true
			}
		})

		expect(result.length).toEqual(1)
		assertIsProduct(result[0])
		expect(result[0].id).toEqual('1')
		expect(result).toMatchSnapshot()
	})

	test('getProducts by categories - paginated', async () => {
		nockScope
			.get('/products')
			.query({
				shopId: 'test_shop_id',
				with: 'variants,images,priceRange,attributes:key(description|name|category)',
				'filters[category]': '1',
				page: '1',
				perPage: '2'
			})
			.reply(200, productsFirstPageResponse)
			.get('/products')
			.query({
				shopId: 'test_shop_id',
				with: 'variants,images,priceRange,attributes:key(description|name|category)',
				'filters[category]': '1',
				page: '2',
				perPage: '2'
			})
			.reply(200, productsLastPageResponse)

		const result = await codec.getProducts({
			category: {
				id: '1',
				name: 'test_category_name',
				slug: 'test_category_slug',
				children: [],
				products: [],
				showInMenu: true
			},
			pageSize: 2
		})

		expect(result.length).toEqual(4)
		expect(result[0].id).toEqual('1')
		expect(result[1].id).toEqual('2')
		expect(result[2].id).toEqual('3')
		expect(result[3].id).toEqual('4')
		expect(result).toMatchSnapshot()
	})

	test('getCategory by slug', async () => {
		nockScope
			.get('/categories')
			.query({
				shopId: 'test_shop_id'
			})
			.reply(200, categorySingleResponse)
			.get('/products')
			.query({
				shopId: 'test_shop_id',
				with: 'variants,images,priceRange,attributes:key(description|name|category)',
				'filters[category]': '1',
				page: '1',
				perPage: '20'
			})
			.reply(200, productsSingleResponse)

		const result = await codec.getCategory({ slug: 'maenner' })

		assertIsCategory(result)
		expect(result).toMatchSnapshot()
	})

	test('getCategoryTree', async () => {
		nockScope
			.get('/categories')
			.query({
				shopId: 'test_shop_id'
			})
			.reply(200, categorySingleResponse)
		const result = await codec.getCategoryTree({})

		expect(result.length).toEqual(1)
		assertIsCategory(result[0])
		expect(result).toMatchSnapshot()
	})
})
