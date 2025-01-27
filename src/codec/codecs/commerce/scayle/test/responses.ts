export const productsSingleResponse = {
	pagination: {
		current: 1,
		total: 1,
		perPage: 1,
		page: 1,
		first: 1,
		prev: 1,
		next: 1,
		last: 1
	},
	entities: [
		{
			id: 1,
			isActive: true,
			isSoldOut: false,
			isNew: false,
			createdAt: '2024-12-05T13:49:35+00:00',
			updatedAt: '2024-12-05T13:49:36+00:00',
			indexedAt: '2025-01-14T11:17:30+00:00',
			firstLiveAt: '1970-01-01T00:00:00+00:00',
			masterKey: 'LEV003100',
			referenceKey: 'LEV0074002000005',
			attributes: {
				category: {
					id: 551,
					key: 'category',
					label: 'Master Categories (AG)',
					type: '',
					multiSelect: true,
					values: [
						{
							id: 3,
							label: 'Damen',
							value: '1'
						}
					]
				},
				name: {
					id: 20005,
					key: 'name',
					label: 'Name',
					type: '',
					multiSelect: false,
					values: {
						id: 20005,
						label: 'Leviz T-Shirt',
						value: 'name'
					}
				},
				description: {
					id: 20006,
					key: 'description',
					label: 'Description',
					type: '',
					multiSelect: false,
					values: {
						id: 20006,
						label: '',
						value: 'description'
					}
				}
			},
			images: [
				{
					hash: 'images/68bf124a0517bffaa5fe1dc7ac8707db.jpg'
				},
				{
					hash: 'https://dc-integration-middleware-test-demo-absolute-url.cdn.aboutyou.cloud/images/68bf124a0517bffaa5fe1dc7ac8707db.jpg'
				}
			],
			variants: [
				{
					id: 31,
					referenceKey: 'LEV0074002000005_S',
					firstLiveAt: '1970-01-01T00:00:00+00:00',
					createdAt: '2024-12-05T13:49:35+00:00',
					updatedAt: '2024-12-05T13:50:23+00:00',
					stock: {
						supplierId: 1,
						warehouseId: 1,
						quantity: 40,
						isSellableWithoutStock: false,
						expectedAvailabilityAt: null
					},
					price: {
						currencyCode: 'EUR',
						withTax: 2990,
						withoutTax: 2513,
						recommendedRetailPrice: null,
						tax: {
							vat: {
								amount: 477,
								rate: 0.19
							}
						},
						appliedReductions: []
					},
					customData: {}
				}
			],
			priceRange: {
				min: {
					currencyCode: 'EUR',
					withTax: 2990,
					withoutTax: 2513,
					recommendedRetailPrice: null,
					tax: {
						vat: {
							amount: 477,
							rate: 0.19
						}
					},
					appliedReductions: []
				},
				max: {
					currencyCode: 'EUR',
					withTax: 2990,
					withoutTax: 2513,
					recommendedRetailPrice: null,
					tax: {
						vat: {
							amount: 477,
							rate: 0.19
						}
					},
					appliedReductions: []
				}
			},
			categories: [
				[
					{
						categoryId: 32,
						categoryName: 'test-category',
						categorySlug: 'test-category',
						categoryUrl: '/test-category',
						categoryHidden: false,
						categoryProperties: []
					}
				]
			],
			customData: {}
		}
	]
}

export const productsMultipleResponse = {
	pagination: {
		current: 2,
		total: 2,
		perPage: 2,
		page: 1,
		first: 1,
		prev: 1,
		next: 1,
		last: 1
	},
	entities: [
		{
			id: 1,
			isActive: true,
			isSoldOut: false,
			isNew: false,
			createdAt: '2024-12-05T13:49:13+00:00',
			updatedAt: '2024-12-05T13:49:14+00:00',
			indexedAt: '2025-01-14T14:18:37+00:00',
			firstLiveAt: '1970-01-01T00:00:00+00:00',
			masterKey: 'THS090600',
			referenceKey: 'THS0906008000001',
			attributes: {
				description: {
					id: 20006,
					key: 'description',
					label: 'Description',
					type: '',
					multiSelect: false,
					values: {
						id: 20006,
						label: '',
						value: 'description'
					}
				},
				name: {
					id: 20005,
					key: 'name',
					label: 'Name',
					type: '',
					multiSelect: false,
					values: {
						id: 20005,
						label: 'Helfeger Shirt',
						value: 'name'
					}
				},
				category: {
					id: 551,
					key: 'category',
					label: 'Master Categories (AG)',
					type: '',
					multiSelect: true,
					values: [
						{
							id: 7,
							label: 'Herren',
							value: '5'
						}
					]
				}
			},
			images: [
				{
					hash: 'images/68bf124a0517bffaa5fe1dc7ac8707db.jpg'
				}
			],
			variants: [
				{
					id: 1,
					referenceKey: 'THS0906008000001_S',
					firstLiveAt: '1970-01-01T00:00:00+00:00',
					createdAt: '2024-12-05T13:49:13+00:00',
					updatedAt: '2024-12-05T13:49:58+00:00',
					stock: {
						supplierId: 1,
						warehouseId: 1,
						quantity: 30,
						isSellableWithoutStock: false,
						expectedAvailabilityAt: null
					},
					price: {
						currencyCode: 'EUR',
						withTax: 3990,
						withoutTax: 3353,
						recommendedRetailPrice: null,
						tax: {
							vat: {
								amount: 637,
								rate: 0.19
							}
						},
						appliedReductions: []
					},
					customData: {}
				}
			],
			priceRange: {
				min: {
					currencyCode: 'EUR',
					withTax: 3990,
					withoutTax: 3353,
					recommendedRetailPrice: null,
					tax: {
						vat: {
							amount: 637,
							rate: 0.19
						}
					},
					appliedReductions: []
				},
				max: {
					currencyCode: 'EUR',
					withTax: 3990,
					withoutTax: 3353,
					recommendedRetailPrice: null,
					tax: {
						vat: {
							amount: 637,
							rate: 0.19
						}
					},
					appliedReductions: []
				}
			},
			categories: [
				[
					{
						categoryId: 32,
						categoryName: 'test-category',
						categorySlug: 'test-category',
						categoryUrl: '/test-category',
						categoryHidden: false,
						categoryProperties: []
					}
				]
			],
			customData: {}
		},
		{
			id: 2,
			isActive: true,
			isSoldOut: false,
			isNew: false,
			createdAt: '2024-12-05T13:49:16+00:00',
			updatedAt: '2024-12-05T13:49:16+00:00',
			indexedAt: '2025-01-14T14:18:37+00:00',
			firstLiveAt: '1970-01-01T00:00:00+00:00',
			masterKey: 'THS090600',
			referenceKey: 'THS0906006000001',
			attributes: {
				name: {
					id: 20005,
					key: 'name',
					label: 'Name',
					type: '',
					multiSelect: false,
					values: {
						id: 20005,
						label: 'Helfeger Shirt',
						value: 'name'
					}
				},
				category: {
					id: 551,
					key: 'category',
					label: 'Master Categories (AG)',
					type: '',
					multiSelect: true,
					values: [
						{
							id: 7,
							label: 'Herren',
							value: '5'
						}
					]
				},
				description: {
					id: 20006,
					key: 'description',
					label: 'Description',
					type: '',
					multiSelect: false,
					values: {
						id: 20006,
						label: '',
						value: 'description'
					}
				}
			},
			images: [
				{
					hash: 'images/68bf124a0517bffaa5fe1dc7ac8707db.jpg'
				}
			],
			variants: [
				{
					id: 4,
					referenceKey: 'THS0906006000001_S',
					firstLiveAt: '1970-01-01T00:00:00+00:00',
					createdAt: '2024-12-05T13:49:16+00:00',
					updatedAt: '2024-12-05T13:49:58+00:00',
					stock: {
						supplierId: 1,
						warehouseId: 1,
						quantity: 34,
						isSellableWithoutStock: false,
						expectedAvailabilityAt: null
					},
					price: {
						currencyCode: 'EUR',
						withTax: 3990,
						withoutTax: 3353,
						recommendedRetailPrice: null,
						tax: {
							vat: {
								amount: 637,
								rate: 0.19
							}
						},
						appliedReductions: []
					},
					customData: {}
				}
			],
			priceRange: {
				min: {
					currencyCode: 'EUR',
					withTax: 3990,
					withoutTax: 3353,
					recommendedRetailPrice: null,
					tax: {
						vat: {
							amount: 637,
							rate: 0.19
						}
					},
					appliedReductions: []
				},
				max: {
					currencyCode: 'EUR',
					withTax: 3990,
					withoutTax: 3353,
					recommendedRetailPrice: null,
					tax: {
						vat: {
							amount: 637,
							rate: 0.19
						}
					},
					appliedReductions: []
				}
			},
			categories: [
				[
					{
						categoryId: 32,
						categoryName: 'test-category',
						categorySlug: 'test-category',
						categoryUrl: '/test-category',
						categoryHidden: false,
						categoryProperties: []
					}
				]
			],
			customData: {}
		}
	]
}

export const productsFirstPageResponse = {
	pagination: {
		current: 2,
		total: 4,
		perPage: 2,
		page: 1,
		first: 1,
		prev: 1,
		next: 2,
		last: 7
	},
	entities: [
		{
			id: 1,
			isActive: true,
			isSoldOut: false,
			isNew: false,
			createdAt: '2024-12-05T13:49:42+00:00',
			updatedAt: '2024-12-05T13:49:42+00:00',
			indexedAt: '2025-01-14T15:19:11+00:00',
			firstLiveAt: '1970-01-01T00:00:00+00:00',
			masterKey: 'LIJ048000',
			referenceKey: 'LIJ0480001000004',
			attributes: {
				description: {
					id: 20006,
					key: 'description',
					label: 'Description',
					type: '',
					multiSelect: false,
					values: {
						id: 20006,
						label: '',
						value: 'description'
					}
				},
				category: {
					id: 551,
					key: 'category',
					label: 'Master Categories (AG)',
					type: '',
					multiSelect: true,
					values: [
						{
							id: 3,
							label: 'Damen',
							value: '1'
						}
					]
				},
				name: {
					id: 20005,
					key: 'name',
					label: 'Name',
					type: '',
					multiSelect: false,
					values: {
						id: 20005,
						label: 'Liu Jo Sandale CAMELIA',
						value: 'name'
					}
				}
			},
			images: [
				{
					hash: 'images/68bf124a0517bffaa5fe1dc7ac8707db.jpg'
				}
			],
			variants: [
				{
					id: 40,
					referenceKey: 'LIJ0480001000004_38',
					firstLiveAt: '1970-01-01T00:00:00+00:00',
					createdAt: '2024-12-05T13:49:42+00:00',
					updatedAt: '2024-12-05T13:50:13+00:00',
					stock: {
						supplierId: 1,
						warehouseId: 1,
						quantity: 23,
						isSellableWithoutStock: false,
						expectedAvailabilityAt: null
					},
					price: {
						currencyCode: 'EUR',
						withTax: 32990,
						withoutTax: 27723,
						recommendedRetailPrice: null,
						tax: {
							vat: {
								amount: 5267,
								rate: 0.19
							}
						},
						appliedReductions: []
					},
					customData: {}
				}
			],
			priceRange: {
				min: {
					currencyCode: 'EUR',
					withTax: 32990,
					withoutTax: 27723,
					recommendedRetailPrice: null,
					tax: {
						vat: {
							amount: 5267,
							rate: 0.19
						}
					},
					appliedReductions: []
				},
				max: {
					currencyCode: 'EUR',
					withTax: 32990,
					withoutTax: 27723,
					recommendedRetailPrice: null,
					tax: {
						vat: {
							amount: 5267,
							rate: 0.19
						}
					},
					appliedReductions: []
				}
			},
			categories: [
				[
					{
						categoryId: 32,
						categoryName: 'test-category',
						categorySlug: 'test-category',
						categoryUrl: '/test-category',
						categoryHidden: false,
						categoryProperties: []
					}
				]
			],
			customData: {}
		},
		{
			id: 2,
			isActive: true,
			isSoldOut: false,
			isNew: false,
			createdAt: '2024-12-05T13:49:40+00:00',
			updatedAt: '2024-12-05T13:49:40+00:00',
			indexedAt: '2025-01-14T15:19:11+00:00',
			firstLiveAt: '1970-01-01T00:00:00+00:00',
			masterKey: 'LEV003100',
			referenceKey: 'LEV0031009000002',
			attributes: {
				name: {
					id: 20005,
					key: 'name',
					label: 'Name',
					type: '',
					multiSelect: false,
					values: {
						id: 20005,
						label: 'Leviz T-Shirt',
						value: 'name'
					}
				},
				description: {
					id: 20006,
					key: 'description',
					label: 'Description',
					type: '',
					multiSelect: false,
					values: {
						id: 20006,
						label: '',
						value: 'description'
					}
				},
				category: {
					id: 551,
					key: 'category',
					label: 'Master Categories (AG)',
					type: '',
					multiSelect: true,
					values: [
						{
							id: 3,
							label: 'Damen',
							value: '1'
						}
					]
				}
			},
			images: [
				{
					hash: 'images/68bf124a0517bffaa5fe1dc7ac8707db.jpg'
				}
			],
			variants: [
				{
					id: 37,
					referenceKey: 'LEV0031009000002_S',
					firstLiveAt: '1970-01-01T00:00:00+00:00',
					createdAt: '2024-12-05T13:49:40+00:00',
					updatedAt: '2024-12-05T13:50:23+00:00',
					stock: {
						supplierId: 1,
						warehouseId: 1,
						quantity: 10,
						isSellableWithoutStock: false,
						expectedAvailabilityAt: null
					},
					price: {
						currencyCode: 'EUR',
						withTax: 2990,
						withoutTax: 2513,
						recommendedRetailPrice: null,
						tax: {
							vat: {
								amount: 477,
								rate: 0.19
							}
						},
						appliedReductions: []
					},
					customData: {}
				}
			],
			priceRange: {
				min: {
					currencyCode: 'EUR',
					withTax: 2990,
					withoutTax: 2513,
					recommendedRetailPrice: null,
					tax: {
						vat: {
							amount: 477,
							rate: 0.19
						}
					},
					appliedReductions: []
				},
				max: {
					currencyCode: 'EUR',
					withTax: 2990,
					withoutTax: 2513,
					recommendedRetailPrice: null,
					tax: {
						vat: {
							amount: 477,
							rate: 0.19
						}
					},
					appliedReductions: []
				}
			},
			categories: [
				[
					{
						categoryId: 32,
						categoryName: 'test-category',
						categorySlug: 'test-category',
						categoryUrl: '/test-category',
						categoryHidden: false,
						categoryProperties: []
					}
				]
			],
			customData: {}
		}
	]
}

export const productsLastPageResponse = {
	pagination: {
		current: 2,
		total: 4,
		perPage: 2,
		page: 2,
		first: 1,
		prev: 1,
		next: 3,
		last: 7
	},
	entities: [
		{
			id: 3,
			isActive: true,
			isSoldOut: false,
			isNew: false,
			createdAt: '2024-12-05T13:49:37+00:00',
			updatedAt: '2024-12-05T13:49:38+00:00',
			indexedAt: '2025-01-14T15:19:11+00:00',
			firstLiveAt: '1970-01-01T00:00:00+00:00',
			masterKey: 'LEV003100',
			referenceKey: 'LEV0031001002000',
			attributes: {
				category: {
					id: 551,
					key: 'category',
					label: 'Master Categories (AG)',
					type: '',
					multiSelect: true,
					values: [
						{
							id: 3,
							label: 'Damen',
							value: '1'
						}
					]
				},
				description: {
					id: 20006,
					key: 'description',
					label: 'Description',
					type: '',
					multiSelect: false,
					values: {
						id: 20006,
						label: '',
						value: 'description'
					}
				},
				name: {
					id: 20005,
					key: 'name',
					label: 'Name',
					type: '',
					multiSelect: false,
					values: {
						id: 20005,
						label: 'Leviz T-Shirt',
						value: 'name'
					}
				}
			},
			images: [
				{
					hash: 'images/68bf124a0517bffaa5fe1dc7ac8707db.jpg'
				}
			],
			variants: [
				{
					id: 34,
					referenceKey: 'LEV0031001002000_S',
					firstLiveAt: '1970-01-01T00:00:00+00:00',
					createdAt: '2024-12-05T13:49:37+00:00',
					updatedAt: '2024-12-05T13:50:26+00:00',
					stock: {
						supplierId: 1,
						warehouseId: 1,
						quantity: 43,
						isSellableWithoutStock: false,
						expectedAvailabilityAt: null
					},
					price: {
						currencyCode: 'EUR',
						withTax: 2990,
						withoutTax: 2513,
						recommendedRetailPrice: null,
						tax: {
							vat: {
								amount: 477,
								rate: 0.19
							}
						},
						appliedReductions: []
					},
					customData: {}
				}
			],
			priceRange: {
				min: {
					currencyCode: 'EUR',
					withTax: 2990,
					withoutTax: 2513,
					recommendedRetailPrice: null,
					tax: {
						vat: {
							amount: 477,
							rate: 0.19
						}
					},
					appliedReductions: []
				},
				max: {
					currencyCode: 'EUR',
					withTax: 2990,
					withoutTax: 2513,
					recommendedRetailPrice: null,
					tax: {
						vat: {
							amount: 477,
							rate: 0.19
						}
					},
					appliedReductions: []
				}
			},
			categories: [
				[
					{
						categoryId: 32,
						categoryName: 'test-category',
						categorySlug: 'test-category',
						categoryUrl: '/test-category',
						categoryHidden: false,
						categoryProperties: []
					}
				]
			],
			customData: {}
		},
		{
			id: 4,
			isActive: true,
			isSoldOut: false,
			isNew: false,
			createdAt: '2024-12-05T13:49:35+00:00',
			updatedAt: '2024-12-05T13:49:36+00:00',
			indexedAt: '2025-01-14T15:19:11+00:00',
			firstLiveAt: '1970-01-01T00:00:00+00:00',
			masterKey: 'LEV003100',
			referenceKey: 'LEV0074002000005',
			attributes: {
				name: {
					id: 20005,
					key: 'name',
					label: 'Name',
					type: '',
					multiSelect: false,
					values: {
						id: 20005,
						label: 'Leviz T-Shirt',
						value: 'name'
					}
				},
				category: {
					id: 551,
					key: 'category',
					label: 'Master Categories (AG)',
					type: '',
					multiSelect: true,
					values: [
						{
							id: 3,
							label: 'Damen',
							value: '1'
						}
					]
				},
				description: {
					id: 20006,
					key: 'description',
					label: 'Description',
					type: '',
					multiSelect: false,
					values: {
						id: 20006,
						label: '',
						value: 'description'
					}
				}
			},
			images: [
				{
					hash: 'images/68bf124a0517bffaa5fe1dc7ac8707db.jpg'
				}
			],
			variants: [
				{
					id: 31,
					referenceKey: 'LEV0074002000005_S',
					firstLiveAt: '1970-01-01T00:00:00+00:00',
					createdAt: '2024-12-05T13:49:35+00:00',
					updatedAt: '2024-12-05T13:50:23+00:00',
					stock: {
						supplierId: 1,
						warehouseId: 1,
						quantity: 40,
						isSellableWithoutStock: false,
						expectedAvailabilityAt: null
					},
					price: {
						currencyCode: 'EUR',
						withTax: 2990,
						withoutTax: 2513,
						recommendedRetailPrice: null,
						tax: {
							vat: {
								amount: 477,
								rate: 0.19
							}
						},
						appliedReductions: []
					},
					customData: {}
				}
			],
			priceRange: {
				min: {
					currencyCode: 'EUR',
					withTax: 2990,
					withoutTax: 2513,
					recommendedRetailPrice: null,
					tax: {
						vat: {
							amount: 477,
							rate: 0.19
						}
					},
					appliedReductions: []
				},
				max: {
					currencyCode: 'EUR',
					withTax: 2990,
					withoutTax: 2513,
					recommendedRetailPrice: null,
					tax: {
						vat: {
							amount: 477,
							rate: 0.19
						}
					},
					appliedReductions: []
				}
			},
			categories: [
				[
					{
						categoryId: 32,
						categoryName: 'test-category',
						categorySlug: 'test-category',
						categoryUrl: '/test-category',
						categoryHidden: false,
						categoryProperties: []
					}
				]
			],
			customData: {}
		}
	]
}

export const productNotFoundResponse = {
	pagination: {
		current: 0,
		total: 0,
		perPage: 0,
		page: 1,
		first: 1,
		prev: 1,
		next: 1,
		last: 1
	},
	entities: []
}

export const categorySingleResponse = [
	{
		id: 1,
		path: '/maenner',
		name: 'Männer',
		slug: 'maenner',
		parentId: 0,
		rootlineIds: [1],
		childrenIds: [2, 4, 5],
		properties: [],
		isHidden: false,
		depth: 1,
		supportedFilter: [],
		shopLevelCustomData: {},
		countryLevelCustomData: {},
		children: [
			{
				id: 2,
				path: '/maenner/bekleidung',
				name: 'Bekleidung',
				slug: 'bekleidung',
				parentId: 1,
				rootlineIds: [1, 2],
				childrenIds: [3],
				properties: [],
				isHidden: false,
				depth: 2,
				supportedFilter: [],
				shopLevelCustomData: {},
				countryLevelCustomData: {},
				children: [
					{
						id: 3,
						path: '/maenner/bekleidung/shirts',
						name: 'Shirts',
						slug: 'shirts',
						parentId: 2,
						rootlineIds: [1, 2, 3],
						childrenIds: [],
						properties: [],
						isHidden: false,
						depth: 3,
						supportedFilter: [],
						shopLevelCustomData: {},
						countryLevelCustomData: {},
						children: []
					}
				]
			},
			{
				id: 4,
				path: '/maenner/hosen',
				name: 'Hosen',
				slug: 'hosen',
				parentId: 1,
				rootlineIds: [1, 4],
				childrenIds: [],
				properties: [],
				isHidden: false,
				depth: 2,
				supportedFilter: [],
				shopLevelCustomData: {},
				countryLevelCustomData: {},
				children: []
			},
			{
				id: 5,
				path: '/maenner/schuhe',
				name: 'Schuhe',
				slug: 'schuhe',
				parentId: 1,
				rootlineIds: [1, 5],
				childrenIds: [],
				properties: [],
				isHidden: false,
				depth: 2,
				supportedFilter: [],
				shopLevelCustomData: {},
				countryLevelCustomData: {},
				children: []
			}
		]
	}
]
