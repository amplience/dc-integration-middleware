export const bigcommerceCorsProduct = (id: number) => ({
	addToCartUrl: `https://amplience9.mybigcommerce.com/cart.php?action=add&product_id=${id}`,
	addToWishlistUrl: `https://amplience9.mybigcommerce.com/wishlist.php?action=add&product_id=${id}`,
	availabilityV2: {
		status: 'Available',
		description: ''
	},
	brand: null,
	categories: {
		pageInfo: {
			hasNextPage: false,
			endCursor: 'YXJyYXljb25uZWN0aW9uOjA='
		},
		edges: [
			{
				node: {
					description: '',
					entityId: 23,
					name: 'Shop All',
					path: '/shop-all/'
				},
				cursor: 'YXJyYXljb25uZWN0aW9uOjA='
			}
		]
	},
	condition: 'NEW',
	createdAt: {
		utc: '2020-10-27T18:20:17Z'
	},
	defaultImage: {
		altText: '',
		isDefault: true,
		urlOriginal: 'https://cdn11.bigcommerce.com/s-ivhpe1uqls/images/stencil/original/products/132/446/Hat-front-black__34181__49124.1603822817.png'
	},
	depth: null,
	description: '<div class="s-row">\n<div class="s-column">\n<p class="s-text">Rib knit wool beanie in navy. Embroidered patch in pink at rolled brim.<br /><br />Supplier color: Navy/Pink</p>\n</div>\n</div>\n<div class="s-row">\n<div class="s-column">\n<p class="s-text">100% wool.</p>\n<p class="s-text">Imported.</p>\n</div>\n</div>\n<p class="s-text">&nbsp;</p>',
	entityId: id,
	giftWrappingOptions: {
		pageInfo: {
			hasNextPage: false,
			endCursor: null
		},
		edges: []
	},
	gtin: null,
	height: {
		unit: 'in',
		value: 6
	},
	id: 'UHJvZHVjdDoxMzI=',
	images: {
		pageInfo: {
			hasNextPage: false,
			endCursor: 'YXJyYXljb25uZWN0aW9uOjc='
		},
		edges: [
			{
				node: {
					altText: '',
					isDefault: true,
					urlOriginal: 'https://cdn11.bigcommerce.com/s-ivhpe1uqls/images/stencil/original/products/132/446/Hat-front-black__34181__49124.1603822817.png'
				},
				cursor: 'YXJyYXljb25uZWN0aW9uOjA='
			},
			{
				node: {
					altText: '',
					isDefault: false,
					urlOriginal: 'https://cdn11.bigcommerce.com/s-ivhpe1uqls/images/stencil/original/products/132/452/Hat-left-black__86563__42762.1603822817.png'
				},
				cursor: 'YXJyYXljb25uZWN0aW9uOjE='
			},
			{
				node: {
					altText: '',
					isDefault: false,
					urlOriginal: 'https://cdn11.bigcommerce.com/s-ivhpe1uqls/images/stencil/original/products/132/456/Hat-back-black__73249__27210.1603822817.png'
				},
				cursor: 'YXJyYXljb25uZWN0aW9uOjI='
			},
			{
				node: {
					altText: '',
					isDefault: false,
					urlOriginal: 'https://cdn11.bigcommerce.com/s-ivhpe1uqls/images/stencil/original/products/132/459/Hat-right-black__47486__46151.1603822817.png'
				},
				cursor: 'YXJyYXljb25uZWN0aW9uOjM='
			},
			{
				node: {
					altText: '',
					isDefault: false,
					urlOriginal: 'https://cdn11.bigcommerce.com/s-ivhpe1uqls/images/stencil/original/products/132/448/Hat-front-white__62014__04169.1603822817.png'
				},
				cursor: 'YXJyYXljb25uZWN0aW9uOjQ='
			},
			{
				node: {
					altText: '',
					isDefault: false,
					urlOriginal: 'https://cdn11.bigcommerce.com/s-ivhpe1uqls/images/stencil/original/products/132/450/Hat-left-white__24819__61058.1603822817.png'
				},
				cursor: 'YXJyYXljb25uZWN0aW9uOjU='
			},
			{
				node: {
					altText: '',
					isDefault: false,
					urlOriginal: 'https://cdn11.bigcommerce.com/s-ivhpe1uqls/images/stencil/original/products/132/454/Hat-back-white__89051__65142.1603822817.png'
				},
				cursor: 'YXJyYXljb25uZWN0aW9uOjY='
			},
			{
				node: {
					altText: '',
					isDefault: false,
					urlOriginal: 'https://cdn11.bigcommerce.com/s-ivhpe1uqls/images/stencil/original/products/132/458/Hat-right-white__01475__34887.1603822817.png'
				},
				cursor: 'YXJyYXljb25uZWN0aW9uOjc='
			}
		]
	},
	inventory: {
		aggregated: null,
		hasVariantInventory: false,
		isInStock: true
	},
	maxPurchaseQuantity: null,
	minPurchaseQuantity: null,
	mpn: null,
	name: 'Beanie',
	path: '/mesh-back-snapback/',
	plainTextDescription: '\n\nRib knit wool beanie in navy. Embroidered patch in pink at rolled brim.Supplier color: Navy/Pink\n\n\n\n\n',
	prices: {
		basePrice: {
			currencyCode: 'USD',
			value: 22
		},
		mapPrice: null,
		price: {
			currencyCode: 'USD',
			value: 22
		},
		priceRange: {
			max: {
				currencyCode: 'USD',
				value: 22
			},
			min: {
				currencyCode: 'USD',
				value: 22
			}
		},
		retailPrice: null,
		retailPriceRange: null,
		salePrice: null,
		saved: null
	},
	reviewSummary: {
		averageRating: 0,
		numberOfReviews: 0,
		summationOfRatings: 0
	},
	seo: {
		metaDescription: '',
		metaKeywords: '',
		pageTitle: ''
	},
	showCartAction: true,
	sku: '202129M138042',
	type: 'Physical',
	upc: null,
	variants: {
		pageInfo: {
			hasNextPage: false,
			endCursor: 'YXJyYXljb25uZWN0aW9uOjA='
		},
		edges: [
			{
				node: {
					defaultImage: null,
					depth: null,
					entityId: id + 1000,
					gtin: null,
					height: {
						unit: 'in',
						value: 6
					},
					id: 'VmFyaWFudDoyMzE=',
					inventory: {
						aggregated: null,
						isInStock: false
					},
					isPurchasable: false,
					mpn: null,
					options: {
						pageInfo: {
							hasNextPage: false,
							endCursor: null
						},
						edges: []
					},
					prices: {
						basePrice: {
							currencyCode: 'USD',
							value: 22
						},
						mapPrice: null,
						price: {
							currencyCode: 'USD',
							value: 22
						},
						priceRange: {
							max: {
								currencyCode: 'USD',
								value: 22
							},
							min: {
								currencyCode: 'USD',
								value: 22
							}
						},
						retailPrice: null,
						retailPriceRange: null,
						salePrice: null,
						saved: null
					},
					sku: id + 'Mvariant',
					upc: null,
					weight: {
						unit: 'oz',
						value: 2.24
					},
					width: {
						unit: 'in',
						value: 6
					}
				},
				cursor: 'YXJyYXljb25uZWN0aW9uOjA='
			}
		]
	},
	warranty: '',
	weight: {
		unit: 'oz',
		value: 2.24
	},
	width: {
		unit: 'in',
		value: 6
	}
})

export const bigcommerceCorsProductQuery = (
	total: number,
	pageSize: number,
	pageNumber: number
) => {
	const baseId = pageSize * pageNumber
	const end = Math.min(total, baseId + pageSize)
	return {
		data: {
			site: {
				search: {
					searchProducts: {
						products: {
							collectionInfo: {
								totalItems: total
							},
							pageInfo: {
								hasNextPage:  end !== total,
								endCursor: 'cursor' + (end - 1)
							},
							edges:
								Array.from({length: (end - baseId)}).map((_, index) => ({
									node: bigcommerceCorsProduct(baseId + index),
									cursor: 'cursor' + (baseId + index)
								}))
						}
					}
				}
			}
		}
	}
}

export const bigcommerceCorsProductsByCategory = (
	categoryId: number,
	total: number,
	pageSize: number,
	pageNumber: number
) => {
	const baseId = pageSize * pageNumber
	const end = Math.min(total, baseId + pageSize)

	return {
		data: {
			site: {
				category: {
					entityId: categoryId,
					products: {
						collectionInfo: {
							totalItems: total
						},
						pageInfo: {
							hasNextPage: end !== total,
							endCursor: 'cursor' + (end - 1)
						},
						edges:
							Array.from({length: (end - baseId)}).map((_, index) => ({
								node: bigcommerceCorsProduct(baseId + index),
								cursor: 'cursor' + (baseId + index)
							}))
					}
				}
			}
		}
	}
}

export const bigcommerceCorsProductsByIDs = (
	ids: number[]
) => {
	return {
		data: {
			site: {
				products: {
					collectionInfo: {
						totalItems: ids.length
					},
					pageInfo: {
						hasNextPage: false,
						endCursor: 'cursor' + ids[ids.length - 1]
					},
					edges: ids.map((id) => ({
						node: bigcommerceCorsProduct(id)
					}))
				}
			}
		}
	}
}

export const bigcommerceCorsCategoryTree = {
	data: {
		site: {
			categoryTree: [
				{
					name: 'Shop All',
					path: '/shop-all/',
					entityId: 23,
					description: '',
					image: null,
					productCount: 22,
					children: []
				},
				{
					name: 'Bath',
					path: '/bath/',
					entityId: 18,
					description: '',
					image: null,
					productCount: 0,
					children: [
						{
							name: 'Bath Utilities',
							path: '/bath-utilities/',
							entityId: 24,
							description: '',
							image: null,
							productCount: 0,
							children: []
						},
						{
							name: 'Toothbrushes',
							path: '/bath/toothbrushes/',
							entityId: 25,
							description: '',
							image: null,
							productCount: 2,
							children: [
								{
									name: 'Electric',
									path: '/bath/toothbrushes/electric/',
									entityId: 26,
									description: '',
									image: null,
									productCount: 1,
									children: []
								}
							]
						}
					]
				},
				{
					name: 'Garden',
					path: '/garden/',
					entityId: 19,
					description: '',
					image: null,
					productCount: 0,
					children: []
				},
				{
					name: 'Kitchen',
					path: '/kitchen/',
					entityId: 21,
					description: '',
					image: null,
					productCount: 0,
					children: []
				},
				{
					name: 'Publications',
					path: '/publications/',
					entityId: 20,
					description: '',
					image: null,
					productCount: 0,
					children: []
				},
				{
					name: 'Utility',
					path: '/utility/',
					entityId: 22,
					description: '',
					image: null,
					productCount: 0,
					children: []
				}
			]
		}
	}
}