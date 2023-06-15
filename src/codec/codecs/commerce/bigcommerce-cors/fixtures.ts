import { MockFixture, dataToResponse } from '../../../../common/test/rest-mock'
import { 
	bigcommerceCorsCategoryTree,
	bigcommerceCorsProductQuery,
	bigcommerceCorsProductsByCategory,
	bigcommerceCorsProductsByIDs
} from './test/responses'
import { 
	categoriesRequest, 
	productRequest, 
	productRequestMin, 
	productsByCategoryCursor, 
	productsByCategoryCursor2, 
	productsByCategoryRequest, 
	productsByKeywordCursor,
	productsByKeywordCursor2
} from './test/requests'

export const commerceProductRequests: MockFixture = {
	post: {
		'https://site_id.mybigcommerce.com/graphql': dataToResponse([
			{
				data: productRequest([0]).config.data,
				response:
				{
					data: bigcommerceCorsProductsByIDs([0])
				}
			},
			{
				data: productRequest([0, 1]).config.data,
				response:
				{
					data: bigcommerceCorsProductsByIDs([0, 1])
				}
			},
			{
				data: productRequest([0, 3, 1]).config.data,
				response:
				{
					data: bigcommerceCorsProductsByIDs([0, 1])
				}
			},
			{
				data: productRequestMin([0]).config.data,
				response:
				{
					data: bigcommerceCorsProductsByIDs([0])
				}
			},
			{
				data: productRequestMin([0, 1]).config.data,
				response:
				{
					data: bigcommerceCorsProductsByIDs([0, 1])
				}
			},
			{
				data: productRequestMin([0, 3, 1]).config.data,
				response:
				{
					data: bigcommerceCorsProductsByIDs([0, 1])
				}
			},
		])
	}
}

export const commerceProductMissingRequests: MockFixture = {
	post: {
		'https://site_id.mybigcommerce.com/graphql': {
			data: bigcommerceCorsProductsByIDs([])
		}
	}
}


export const commerceProductsByKeywordRequests: MockFixture = {
	post: {
		'https://site_id.mybigcommerce.com/graphql': {
			data: bigcommerceCorsProductQuery(15, 20, 0)
		}
	}
}

export const commerceProductsByKeywordPaginatedRequests: MockFixture = {
	post: {
		'https://site_id.mybigcommerce.com/graphql': dataToResponse([
			{
				data: productsByKeywordCursor.config.data,
				response: {
					data: bigcommerceCorsProductQuery(55, 20, 1)
				}
			},
			{
				data: productsByKeywordCursor2.config.data,
				response: {
					data: bigcommerceCorsProductQuery(55, 20, 2)
				}
			}
		])
	}
}

export const commerceProductsByCategoryRequests: MockFixture = {
	post: {
		'https://site_id.mybigcommerce.com/graphql': dataToResponse([
			{
				data: categoriesRequest.config.data,
				response: {
					data: bigcommerceCorsCategoryTree
				}
			},
			{
				data: productsByCategoryRequest.config.data,
				response: {
					data: bigcommerceCorsProductsByCategory(23, 15, 20, 0)
				}
			}
		])
	}
}

export const commerceProductsByCategoryPaginatedRequests: MockFixture = {
	post: {
		'https://site_id.mybigcommerce.com/graphql': dataToResponse([
			{
				data: productsByCategoryCursor.config.data,
				response: {
					data: bigcommerceCorsProductsByCategory(23, 55, 20, 1)
				}
			},
			{
				data: productsByCategoryCursor2.config.data,
				response: {
					data: bigcommerceCorsProductsByCategory(23, 55, 20, 2)
				}
			}
		])
	}
}

export const commerceCategoriesRequests: MockFixture = {
	post: {
		'https://site_id.mybigcommerce.com/graphql': {
			data: bigcommerceCorsCategoryTree
		}
	}
}