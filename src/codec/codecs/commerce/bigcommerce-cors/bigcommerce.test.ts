import { Request, massMock } from '../../../../common/test/rest-mock'
import axios from 'axios'
import { CommerceCodec } from '../../core'
import BigCommerceCorsCodecType, { BigCommerceCorsCommerceCodec } from '.'
import { 
	bigcommerceCorsProduct,
	//bigcommerceProduct 
} from './test/responses'
import {
	exampleCategoryTree, 
	exampleProduct,
	exampleProducts,
} from './test/results'
import { 
	categoriesRequest,
	productRequest, 
	productsByKeywordRequest, 
	productsByCategoryRequest,
	productsByKeywordCursor,
	productsByKeywordCursor2,
	productsByCategoryCursor2,
	productsByCategoryCursor,
} from './test/requests'
import { config } from './test/config'
import { flattenConfig } from '../../../../common/util'

import { 
	commerceCategoriesRequests,
	commerceProductMissingRequests,
	commerceProductRequests,
	commerceProductsByCategoryPaginatedRequests,
	commerceProductsByCategoryRequests, 
	commerceProductsByKeywordPaginatedRequests, 
	commerceProductsByKeywordRequests, 
} from './fixtures'
import { PaginationArgs } from '../../../../common/types'

jest.mock('axios')

describe('bigcommerce cors integration', function () {
	let codec: CommerceCodec
	let requests: Request[]

	beforeEach(async () => {
		jest.resetAllMocks()
		requests = []
	})

	test('getProduct (by id)', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductRequests)
		codec = new BigCommerceCorsCommerceCodec(flattenConfig(config))
		await codec.init(new BigCommerceCorsCodecType())

		// Test
		const result = await codec.getProduct({ id: '0' })
		expect(result).toEqual(exampleProduct('0'))
		expect(requests).toEqual([
			productRequest([0])
		])
	})

	test('getProducts (multiple)', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductRequests)
		codec = new BigCommerceCorsCommerceCodec(flattenConfig(config))
		await codec.init(new BigCommerceCorsCodecType())

		// Test
		const result = await codec.getProducts({
			productIds: '0,1'
		})

		expect(requests).toEqual([
			productRequest([0, 1]),
		])

		expect(result).toEqual([
			exampleProduct('0'),
			exampleProduct('1')
		])
	})

	test('getProducts (keyword)', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductsByKeywordRequests)
		codec = new BigCommerceCorsCommerceCodec(flattenConfig(config))
		await codec.init(new BigCommerceCorsCodecType())

		// Test
		const products = await codec.getProducts({ keyword: 'fulfilled' })
		expect(products).toEqual(exampleProducts(15))
		expect(requests).toEqual([
			productsByKeywordRequest
		])
	})

	test('getProducts (category)', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductsByCategoryRequests)
		codec = new BigCommerceCorsCommerceCodec(flattenConfig(config))
		await codec.init(new BigCommerceCorsCodecType())

		// Test
		const products = await codec.getProducts({
			category: {
				name: 'Shop All',
				slug: 'shop-all',
				id: '23',
				children: [],
				products: []
			}
		})

		expect(products).toEqual(exampleProducts(15))

		expect(requests).toEqual([
			productsByCategoryRequest
		])
	})

	test('getProducts paginated (keyword)', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductsByKeywordPaginatedRequests)
		codec = new BigCommerceCorsCommerceCodec(flattenConfig(config))
		await codec.init(new BigCommerceCorsCodecType())

		const args = {
			keyword: 'fulfilled',

			pageNum: 1,
			pageSize: 20,
			pageCount: 2,
			cursor: 'cursor19',
			cursorPage: 1
		} as PaginationArgs

		// Test
		const products = await codec.getProducts(args)

		expect(args.cursor).toEqual('cursor54')
		expect(args.cursorPage).toEqual(3)
		expect(args.total).toEqual(55)

		expect(products).toEqual(exampleProducts(35, 20))
		expect(requests).toEqual([
			productsByKeywordCursor,
			productsByKeywordCursor2
		])
	})

	test('getProducts paginated (category)', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductsByCategoryPaginatedRequests)
		codec = new BigCommerceCorsCommerceCodec(flattenConfig(config))
		await codec.init(new BigCommerceCorsCodecType())

		const args = {
			category: {
				name: 'Shop All',
				slug: 'shop-all',
				id: '23',
				children: [],
				products: []
			},

			pageNum: 1,
			pageSize: 20,
			pageCount: 2,
			cursor: 'cursor19',
			cursorPage: 1
		} as PaginationArgs

		// Test
		const products = await codec.getProducts(args)

		expect(args.cursor).toEqual('cursor54')
		expect(args.cursorPage).toEqual(3)
		expect(args.total).toEqual(55)

		expect(products).toEqual(exampleProducts(35, 20))

		expect(requests).toEqual([
			productsByCategoryCursor,
			productsByCategoryCursor2
		])
	})

	test('getProduct (missing)', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductMissingRequests)
		codec = new BigCommerceCorsCommerceCodec(flattenConfig(config))
		await codec.init(new BigCommerceCorsCodecType())

		// Test
		const result = await codec.getProduct({ id: '3' })
		expect(result).toBeNull()
		expect(requests).toEqual([
			productRequest([3])
		])
	})

	test('getProducts (multiple, one missing)', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductRequests)
		codec = new BigCommerceCorsCommerceCodec(flattenConfig(config))
		await codec.init(new BigCommerceCorsCodecType())

		// Test
		const result = await codec.getProducts({
			productIds: '0,3,1'
		})

		expect(requests).toEqual([
			productRequest([0, 3, 1]),
		])

		expect(result).toEqual([
			exampleProduct('0'),
			null,
			exampleProduct('1')
		])
	})

	test('getRawProducts', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductRequests)
		codec = new BigCommerceCorsCommerceCodec(flattenConfig(config))
		await codec.init(new BigCommerceCorsCodecType())

		// Test
		const result = await codec.getRawProducts({
			productIds: '0,1'
		})

		expect(requests).toEqual([
			productRequest([0, 1]),
		])

		expect(result).toEqual([
			bigcommerceCorsProduct(0),
			bigcommerceCorsProduct(1)
		])
	})

	test('getRawProducts (multiple, one missing)', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductRequests)
		codec = new BigCommerceCorsCommerceCodec(flattenConfig(config))
		await codec.init(new BigCommerceCorsCodecType())

		// Test
		const result = await codec.getRawProducts({
			productIds: '0,3,1'
		})
		expect(requests).toEqual([
			productRequest([0, 3, 1])
		])

		expect(result).toEqual([
			bigcommerceCorsProduct(0),
			null,
			bigcommerceCorsProduct(1)
		])
	})

	test('getCategory', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceProductsByCategoryRequests)
		codec = new BigCommerceCorsCommerceCodec(flattenConfig(config))
		await codec.init(new BigCommerceCorsCodecType())

		// Test
		const categories = await codec.getCategory({ slug: 'shop-all' })
		expect(categories).toEqual({
			name: 'Shop All',
			slug: 'shop-all',
			id: '23',
			children: [],
			products: exampleProducts(15)
		})

		expect(requests).toEqual([
			categoriesRequest,
			productsByCategoryRequest
		])
	})

	test('getCategoryTree', async () => {
		// Setup with the right fixture
		massMock(axios, requests, commerceCategoriesRequests)
		codec = new BigCommerceCorsCommerceCodec(flattenConfig(config))
		await codec.init(new BigCommerceCorsCodecType())

		// Test
		const categories = await codec.getCategoryTree({})
		expect(categories).toEqual(exampleCategoryTree)
		expect(requests).toEqual([
			categoriesRequest
		])
	})

	test('getCustomerGroups', async () => {
		const customerGroups = await codec.getCustomerGroups({})
		expect(customerGroups).toEqual([])
	})
})