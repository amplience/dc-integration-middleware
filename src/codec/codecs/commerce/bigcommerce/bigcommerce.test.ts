import { Request, MockFixture, massMock } from '../../../../common/test/rest-mock'
import axios from 'axios'
import { CommerceCodec } from '../../core'
import BigCommerceCodecType, { BigCommerceCommerceCodec } from '.'
import { bigcommerceProduct, bigcommerceCategories, bigcommerceCustomerGroups } from './test/responses'
import { exampleCustomerGroups, exampleCategoryTree, exampleProduct } from './test/results'
import { categoriesRequest, customerGroupsRequest, searchRequest, productRequest, productCategoryRequest } from './test/requests'
import { config } from './test/config'
import { flattenConfig } from '../../../../common/util'
import { PaginationArgs } from '@/common/types'

jest.mock('axios')

const commerceRequests: MockFixture = {
	get: {
		'https://api.bigcommerce.com/stores/store_hash/v2/customer_groups': {
			data: bigcommerceCustomerGroups
		},
		'https://api.bigcommerce.com/stores/store_hash/v3/catalog/categories/tree': {
			data: {
				data: bigcommerceCategories
			}
		},
		'https://api.bigcommerce.com/stores/store_hash/v3/catalog/products?id:in=1&include=images,variants': {
			data: {
				data: bigcommerceProduct(1)
			}
		},
		'https://api.bigcommerce.com/stores/store_hash/v3/catalog/products?id:in=1,3&include=images,variants': {
			data: {
				data: [
					...bigcommerceProduct(1),
					...bigcommerceProduct(3)
				]
			}
		},
		'https://api.bigcommerce.com/stores/store_hash/v3/catalog/products?include=images%2Cvariants&keyword=keyword&page=1&limit=20': {
			data: {
				data: [
					...bigcommerceProduct(2),
					...bigcommerceProduct(3),
					...bigcommerceProduct(4)
				],
				meta: {
					pagination: {
						total: 3
					}
				}
			}
		},
		'https://api.bigcommerce.com/stores/store_hash/v3/catalog/products?include=images%2Cvariants&categories%3Ain=1&page=1&limit=20': {
			data: {
				data: [
					...bigcommerceProduct(1),
					...bigcommerceProduct(3)
				],
				meta: {
					pagination: {
						total: 2
					}
				}
			}
		},
		'https://api.bigcommerce.com/stores/store_hash/v3/catalog/products?include=images%2Cvariants&keyword=keyword&page=2&limit=1': {
			/* Pagination test */
			data: {
				data: [
					...bigcommerceProduct(2),
				],
				meta: {
					pagination: {
						total: 3
					}
				}
			}
		},
		'https://api.bigcommerce.com/stores/store_hash/v3/catalog/products?include=images%2Cvariants&categories%3Ain=1&page=2&limit=1': {
			/* Pagination test */
			data: {
				data: [
					...bigcommerceProduct(2),
				],
				meta: {
					pagination: {
						total: 3
					}
				}
			}
		},
		'https://api.bigcommerce.com/stores/store_hash/v3/catalog/products?id:in=-1&include=images,variants': {
			data: {
				data: []
			}
		},
		'https://api.bigcommerce.com/stores/store_hash/v3/catalog/products?id:in=1,-1,3&include=images,variants': {
			data: {
				data: [
					...bigcommerceProduct(1),
					null,
					...bigcommerceProduct(3)
				]
			}
		},
	}
}

// BigCommerce Integration tests
describe('bigcommerce integration', function () {
	let codec: CommerceCodec
	let requests: Request[]

	beforeEach(async () => {
		jest.resetAllMocks()
		requests = []
		massMock(axios, requests, commerceRequests)
		codec = new BigCommerceCommerceCodec(flattenConfig(config))
		await codec.init(new BigCommerceCodecType())
	})

	// Get BigCommerce Product
	test('getProduct', async () => {
		const result = await codec.getProduct({
			id: '1'
		})
		expect(requests).toEqual([
			productRequest('1')
		])
		expect(result).toEqual(exampleProduct('1'))
	})

	// Get BigCommerce Products
	test('getProducts (multiple)', async () => {
		const result = await codec.getProducts({
			productIds: '1,3'
		})
		expect(requests).toEqual([
			productRequest('1,3')
		])
		expect(result).toEqual([
			exampleProduct('1'),
			exampleProduct('3')
		])
	})

	// Get BigCommerce Products (filter by keyword in name or sku)
	test('getProducts (keyword)', async () => {
		const result = await codec.getProducts({
			keyword: 'keyword'
		})
		expect(requests).toEqual([
			searchRequest('keyword')
		])
		expect(result).toEqual(Array.from({ length: 3 }).map((_, index) => exampleProduct(`${index + 2}`)))
	})

	// Get BigCommerce Products (from category)
	test('getProducts (category)', async () => {
		const products = await codec.getProducts({
			category: {
				children: [],
				products: [],
				id: '1',
				name: 'Category',
				slug: 'category',
				showInMenu: true,
			}
		})
		expect(requests).toEqual([
			productCategoryRequest(1)
		])
		expect(products).toEqual([
			exampleProduct('1'),
			exampleProduct('3')
		])
	})

	// Get BigCommerce Products (filter by keyword in name or sku, paginated)
	test('getProducts paginated (keyword)', async () => {
		const args = {
			keyword: 'keyword',

			pageNum: 1,
			pageSize: 1,
			pageCount: 1
		} as PaginationArgs

		const result = await codec.getProducts(args)
		expect(requests).toEqual([
			searchRequest('keyword', 2, 1)
		])

		expect(args.total).toEqual(3)
		expect(result).toEqual([
			exampleProduct('2')
		])
	})

	// Get BigCommerce Products (from category, paginated)
	test('getProducts paginated (category)', async () => {
		const args = {
			category: {
				children: [],
				products: [],
				id: '1',
				name: 'Category',
				slug: 'category',
			},

			pageNum: 1,
			pageSize: 1,
			pageCount: 1
		} as PaginationArgs

		const products = await codec.getProducts(args)
		expect(requests).toEqual([
			productCategoryRequest(1, 2, 1)
		])

		expect(args.total).toEqual(3)
		expect(products).toEqual([
			exampleProduct('2')
		])
	})

	// Get BigCommerce Product (missing ID)
	test('getProduct (missing)', async () => {
		const result = await codec.getProduct({
			id: '-1'
		})
		expect(requests).toEqual([
			productRequest('-1')
		])
		expect(result).toBeNull()
	})

	// Get BigCommerce Products (one is missing)
	test('getProducts (multiple, one missing)', async () => {
		const result = await codec.getProducts({
			productIds: '1,-1,3'
		})
		expect(requests).toEqual([
			productRequest('1,-1,3')
		])
		expect(result).toEqual([
			exampleProduct('1'),
			null,
			exampleProduct('3')
		])
	})

	// Get BigCommerce Products (raw, original value)
	test('getRawProducts', async () => {
		const result = await codec.getRawProducts({
			productIds: '1'
		})
		expect(requests).toEqual([
			productRequest('1')
		])
		expect(result).toEqual(
			bigcommerceProduct(1)
		)
	})

	// Get BigCommerce Products (raw and one missing ID)
	test('getRawProducts (multiple, one missing)', async () => {
		const result = await codec.getRawProducts({
			productIds: '1,-1,3'
		})
		expect(requests).toEqual([
			productRequest('1,-1,3')
		])
		expect(result).toEqual([
			...bigcommerceProduct(1),
			null,
			...bigcommerceProduct(3)
		])
	})

	// Get BigCommerce Category with Products
	test('getCategory', async () => {
		const category = await codec.getCategory({ slug: 'men' })
		expect(requests).toEqual([
			categoriesRequest,
			productCategoryRequest(1)
		])
		expect(category).toEqual({
			children: [],
			products: [
				exampleProduct('1'),
				exampleProduct('3')
			],
			id: '1',
			name: 'Men',
			slug: 'men',
			showInMenu: true,
		})
	})

	// Get Category Hierarchy
	test('getCategoryTree', async () => {
		const categoryTree = await codec.getCategoryTree({})
		expect(requests).toEqual([
			categoriesRequest
		])
		expect(categoryTree).toEqual(exampleCategoryTree)
	})

	// Get Customer Groups
	test('getCustomerGroups', async () => {
		const customerGroups = await codec.getCustomerGroups({})
		expect(customerGroups).toEqual(exampleCustomerGroups)
		expect(requests).toEqual([
			customerGroupsRequest
		])
	})
})