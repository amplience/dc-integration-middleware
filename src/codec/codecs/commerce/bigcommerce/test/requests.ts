// BigCommerce Category Hierarchy request
export const categoriesRequest = {
	config: {
		method: 'get',
		baseURL: 'https://api.bigcommerce.com/stores/store_hash',
		headers: {
			'X-Auth-Token': 'api_token',
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		url: '/v3/catalog/categories/tree',
	},
	url: 'https://api.bigcommerce.com/stores/store_hash/v3/catalog/categories/tree'
}

// BigCommerce Customer Groups request
export const customerGroupsRequest = {
	config: {
		method: 'get',
		url: '/v2/customer_groups',
		baseURL: 'https://api.bigcommerce.com/stores/store_hash',
		headers: {
			'X-Auth-Token': 'api_token',
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	},
	url: 'https://api.bigcommerce.com/stores/store_hash/v2/customer_groups',
}

// BigCommerce Search request
export const searchRequest = (filter: string, page = 1, limit = 20) => ({
	config: {
		method: 'get',
		baseURL: 'https://api.bigcommerce.com/stores/store_hash',
		headers: {
			'X-Auth-Token': 'api_token',
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		url: `/v3/catalog/products?include=images%2Cvariants&keyword=${filter}&page=${page}&limit=${limit}`
	},
	url: `https://api.bigcommerce.com/stores/store_hash/v3/catalog/products?include=images%2Cvariants&keyword=${filter}&page=${page}&limit=${limit}`
})

// BigCommerce Product request
export const productRequest = (id: string) => ({
	config: {
		method: 'get',
		baseURL: 'https://api.bigcommerce.com/stores/store_hash',
		headers: {
			'X-Auth-Token': 'api_token',
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		url: `/v3/catalog/products?id:in=${id}&include=images,variants`
	},
	url: `https://api.bigcommerce.com/stores/store_hash/v3/catalog/products?id:in=${id}&include=images,variants`
})

// BigCommerce Product (category) request
export const productCategoryRequest = (id: number, page = 1, limit = 20) => ({
	config: {
		method: 'get',
		baseURL: 'https://api.bigcommerce.com/stores/store_hash',
		headers: {
			'X-Auth-Token': 'api_token',
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		url: `/v3/catalog/products?include=images%2Cvariants&categories%3Ain=${id}&page=${page}&limit=${limit}`
	},
	url: `https://api.bigcommerce.com/stores/store_hash/v3/catalog/products?include=images%2Cvariants&categories%3Ain=${id}&page=${page}&limit=${limit}`
})