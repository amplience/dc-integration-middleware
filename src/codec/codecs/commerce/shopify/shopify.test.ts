import { Request, massMock } from '../../../../common/test/rest-mock'
import axios from 'axios'
import { CommerceCodec } from '../../core'
import ShopifyCodecType, { ShopifyCommerceCodec } from '.'
import { 
	shopifyProduct 
} from './test/responses'
import { 
	exampleCategoryProducts, 
	exampleCustomerGroups, 
	exampleCategoryTree, 
	exampleProduct, 
	exampleProductsByKeyword, 
	exampleProductsByKeywordCursor
} from './test/results'
import { 
	collectionsRequest, 
	segmentsRequest, 
	productRequest, 
	productsByKeywordRequest, 
	productsByCategoryRequest, 
	productsByKeywordCursor,
	productsByCategoryCursor
} from './test/requests'
import { config } from './test/config'
import { flattenConfig } from '../../../../common/util'
import { 
	commerceCollectionsRequests, 
	commerceProductMissingRequests, 
	commerceProductRequests, 
	commerceProductsByCategoryCursorRequests, 
	commerceProductsByCategoryRequests, 
	commerceProductsByKeywordCursorRequests, 
	commerceProductsByKeywordRequests, 
	commerceSegmentsRequests 
} from './fixtures'
import { PaginationArgs } from '@/common'

jest.mock('axios')

describe('shopify integration', function () {
	let codec: CommerceCodec
	let requests: Request[]

	beforeEach(async () => {
		jest.resetAllMocks()
		requests = []
	})

	test('getProduct (by id)', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductRequests)
		codec = new ShopifyCommerceCodec(flattenConfig(config))
		await codec.init(new ShopifyCodecType())

		// Test
		const result = await codec.getProduct({ id: 'ExampleID' })
		expect(result).toEqual(exampleProduct('ExampleID'))
		expect(requests).toEqual([
			productRequest('ExampleID')
		])
	})

	test('getProducts (multiple)', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductRequests)
		codec = new ShopifyCommerceCodec(flattenConfig(config))
		await codec.init(new ShopifyCodecType())

		// Test
		const result = await codec.getProducts({
			productIds: 'ExampleID,ExampleID2'
		})

		expect(requests).toEqual([
			productRequest('ExampleID'),
			productRequest('ExampleID2')
		])

		expect(result).toEqual([
			exampleProduct('ExampleID'),
			exampleProduct('ExampleID2')
		])
	})

	test('getProducts (keyword)', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductsByKeywordRequests)
		codec = new ShopifyCommerceCodec(flattenConfig(config))
		await codec.init(new ShopifyCodecType())

		// Test
		const categories = await codec.getProducts({ keyword: 'fulfilled' })
		expect(categories).toEqual(exampleProductsByKeyword)
		expect(requests).toEqual([
			productsByKeywordRequest
		])
	})

	test('getProducts (category)', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductsByCategoryRequests)
		codec = new ShopifyCommerceCodec(flattenConfig(config))
		await codec.init(new ShopifyCodecType())

		// Test
		const products = await codec.getProducts({
			category: {
				id: '439038837024',
				slug: 'hydrogen',
				name: 'Hydrogen',
				image: null,
				children: [],
				products: [],
				showInMenu: true,
			}
		})

		expect(products).toEqual(exampleCategoryProducts.products)

		expect(requests).toEqual([
			productsByCategoryRequest
		])
	})

	test('getProducts paginated (keyword)', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductsByKeywordCursorRequests)
		codec = new ShopifyCommerceCodec(flattenConfig(config))
		await codec.init(new ShopifyCodecType())

		const args = {
			keyword: 'fulfilled',

			pageNum: 1,
			pageSize: 20,
			pageCount: 1,
			cursor: 'firstpage',
			cursorPage: 1
		} as PaginationArgs

		// Test
		const products = await codec.getProducts(args)

		expect(args.cursor).toEqual('cursor19')
		expect(args.cursorPage).toEqual(2)
		expect(args.total).toBeUndefined()

		expect(products).toEqual(exampleProductsByKeywordCursor)
		expect(requests).toEqual([
			productsByKeywordCursor
		])
	})

	test('getProducts paginated (category)', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductsByCategoryCursorRequests)
		codec = new ShopifyCommerceCodec(flattenConfig(config))
		await codec.init(new ShopifyCodecType())

		const args = {
			category: {
				id: '439038837024',
				slug: 'hydrogen',
				name: 'Hydrogen',
				image: null,
				children: [],
				products: [],
				showInMenu: true,
			},

			pageNum: 1,
			pageSize: 20,
			pageCount: 1,
			cursor: 'firstpage',
			cursorPage: 1
		} as PaginationArgs

		// Test
		const products = await codec.getProducts(args)

		expect(args.cursor).toEqual('cursor19')
		expect(args.cursorPage).toEqual(2)
		expect(args.total).toBeUndefined()

		expect(products).toEqual(exampleProductsByKeywordCursor)

		expect(requests).toEqual([
			productsByCategoryCursor
		])
	})

	test('getProduct (missing)', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductMissingRequests)
		codec = new ShopifyCommerceCodec(flattenConfig(config))
		await codec.init(new ShopifyCodecType())

		// Test
		const result = await codec.getProduct({ id: 'MissingID' })
		expect(result).toBeNull()
		expect(requests).toEqual([
			productRequest('MissingID')
		])
	})

	test('getProducts (multiple, one missing)', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductRequests)
		codec = new ShopifyCommerceCodec(flattenConfig(config))
		await codec.init(new ShopifyCodecType())

		// Test
		const result = await codec.getProducts({
			productIds: 'ExampleID,MissingID,ExampleID2'
		})

		expect(requests).toEqual([
			productRequest('ExampleID'),
			productRequest('MissingID'),
			productRequest('ExampleID2')
		])

		expect(result).toEqual([
			exampleProduct('ExampleID'),
			null,
			exampleProduct('ExampleID2')
		])
	})

	test('getRawProducts', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductRequests)
		codec = new ShopifyCommerceCodec(flattenConfig(config))
		await codec.init(new ShopifyCodecType())

		// Test
		const result = await codec.getRawProducts({
			productIds: 'ExampleID,ExampleID2'
		})

		expect(requests).toEqual([
			productRequest('ExampleID'),
			productRequest('ExampleID2')	
		])

		expect(result).toEqual([
			shopifyProduct('ExampleID').data.product,
			shopifyProduct('ExampleID2').data.product
		])
	})

	test('getRawProducts (multiple, one missing)', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductRequests)
		codec = new ShopifyCommerceCodec(flattenConfig(config))
		await codec.init(new ShopifyCodecType())

		// Test
		const result = await codec.getRawProducts({
			productIds: 'ExampleID,MissingID,ExampleID2'
		})
		expect(requests).toEqual([
			productRequest('ExampleID'),
			productRequest('MissingID'),
			productRequest('ExampleID2')	
		])

		expect(result).toEqual([
			shopifyProduct('ExampleID').data.product,
			null,
			shopifyProduct('ExampleID2').data.product
		])
	})

	test('getCategory', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductsByCategoryRequests)
		codec = new ShopifyCommerceCodec(flattenConfig(config))
		await codec.init(new ShopifyCodecType())

		// Test
		const categories = await codec.getCategory({ slug: 'hydrogen' })
		expect(categories).toEqual(exampleCategoryProducts)

		expect(requests).toEqual([
			collectionsRequest,
			productsByCategoryRequest
		])
	})

	test('getCategoryTree', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceCollectionsRequests)
		codec = new ShopifyCommerceCodec(flattenConfig(config))
		await codec.init(new ShopifyCodecType())

		// Test
		const categories = await codec.getCategoryTree({})
		expect(categories).toEqual(exampleCategoryTree)
		expect(requests).toEqual([
			collectionsRequest
		])
	})

	test('getCustomerGroups', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceSegmentsRequests)
		codec = new ShopifyCommerceCodec(flattenConfig(config))
		await codec.init(new ShopifyCodecType())

		// Test
		const customerGroups = await codec.getCustomerGroups({})
		expect(customerGroups).toEqual(exampleCustomerGroups)
		expect(requests).toEqual([
			segmentsRequest
		])
	})
})