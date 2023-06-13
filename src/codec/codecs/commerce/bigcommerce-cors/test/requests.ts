import { 
	categories, 
	productsByIds, 
	productsByCategory, 
	productsByQuery,
} from '../queries'

export const categoriesRequest = {
	config: {
		baseURL: 'https://site_id.mybigcommerce.com',
		headers: {
			'Authorization': 'Bearer api_token'
		},
		url: 'graphql',
		data: {
			query: categories,
			variables: {}
		}
	},
	url: 'https://site_id.mybigcommerce.com/graphql'
}

export const productRequest = (ids: number[]) => ({
	config: {
		baseURL: 'https://site_id.mybigcommerce.com',
		headers: {
			'Authorization': 'Bearer api_token'
		},
		url: 'graphql',
		data: {
			query: productsByIds,
			variables: {
				ids: ids,
				currencyCode: 'USD'
			}
		}
	},
	url: 'https://site_id.mybigcommerce.com/graphql'
})

export const productsByKeywordRequest = {
	config: {
		baseURL: 'https://site_id.mybigcommerce.com',
		headers: {
			'Authorization': 'Bearer api_token'
		},
		url: 'graphql',
		data: {
			query: productsByQuery,
			variables: {
				pageSize: 50,
				query: 'fulfilled',
				after: undefined,
				currencyCode: 'USD'
			}
		}
	},
	url: 'https://site_id.mybigcommerce.com/graphql'
}

export const productsByKeywordCursor = {
	config: {
		baseURL: 'https://site_id.mybigcommerce.com',
		headers: {
			'Authorization': 'Bearer api_token'
		},
		url: 'graphql',
		data: {
			query: productsByQuery,
			variables: {
				pageSize: 20,
				query: 'fulfilled',
				after: 'cursor19',
				currencyCode: 'USD'
			}
		}
	},
	url: 'https://site_id.mybigcommerce.com/graphql'
}

export const productsByKeywordCursor2 = {
	config: {
		baseURL: 'https://site_id.mybigcommerce.com',
		headers: {
			'Authorization': 'Bearer api_token'
		},
		url: 'graphql',
		data: {
			query: productsByQuery,
			variables: {
				pageSize: 20,
				query: 'fulfilled',
				after: 'cursor39',
				currencyCode: 'USD'
			}
		}
	},
	url: 'https://site_id.mybigcommerce.com/graphql'
}

export const productsByCategoryRequest = {
	config: {
		baseURL: 'https://site_id.mybigcommerce.com',
		headers: {
			'Authorization': 'Bearer api_token'
		},
		url: 'graphql',
		data: {
			query: productsByCategory,
			variables: {
				id: 23,
				pageSize: 50,
				currencyCode: 'USD',
				after: undefined
			}
		}
	},
	url: 'https://site_id.mybigcommerce.com/graphql'
}

export const productsByCategoryCursor = {
	config: {
		baseURL: 'https://site_id.mybigcommerce.com',
		headers: {
			'Authorization': 'Bearer api_token'
		},
		url: 'graphql',
		data: {
			query: productsByCategory,
			variables: {
				pageSize: 20,
				id: 23,
				after: 'cursor19',
				currencyCode: 'USD'
			}
		}
	},
	url: 'https://site_id.mybigcommerce.com/graphql'
}

export const productsByCategoryCursor2 = {
	config: {
		baseURL: 'https://site_id.mybigcommerce.com',
		headers: {
			'Authorization': 'Bearer api_token'
		},
		url: 'graphql',
		data: {
			query: productsByCategory,
			variables: {
				pageSize: 20,
				id: 23,
				after: 'cursor39',
				currencyCode: 'USD'
			}
		}
	},
	url: 'https://site_id.mybigcommerce.com/graphql'
}