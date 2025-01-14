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
					hash: 'https://example/file/images/68bf124a0517bffaa5fe1dc7ac8707db.jpg?brightness=0.96&quality=75&trim=1&height=1067&width=800,https://example/file/images/5464df73e16e82b6282309eac5588217.jpg?quality=75&height=1067&width=800,https://cdn.'
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
					hash: 'https://example/file/cd81a5d37e4241686586812d9e179553?bg=F4F4F5&quality=75&trim=1&height=1067&width=800,https://example/file/1c98f7fc408b9d2cca91abfbf5650df1?bg=F4F4F5&quality=75&height=1067&width=800, https://example/f'
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
					hash: 'https://example/file/8de1d6ebb091d7363a05bcf99a0095f3?quality=75&height=1067&width=800,https://example/file/1894bfbbfec69306940eb79ee3c6c8f4?bg=F4F4F5&quality=75&trim=1&height=1067&width=800,'
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
					hash: 'https://example/file/images/bc06c53f15b5a6634e10747378fc9eb7.png?bg=F4F4F5&quality=75&trim=1&height=1067&width=800,https://example/file/images/c453b9bb1b3265d8f65a4736f7631600.png?bg=F4F4F5&quality=75&trim=1&height=1067&width=800,h'
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
					hash: 'https://example/file/38ee8cd16ca9f4e7912ec4df24d1c753?bg=F4F4F5&quality=75&trim=1&height=1067&width=800,https://example/file/c4a36b4e67705e7de4be766e78d0a262?quality=75&height=1067&width=800,https://example/file/a95cc92'
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
					hash: 'https://example/file/6074e8f1a0b1cd81885a1769e5d0cfa1?bg=F4F4F5&quality=75&trim=1&height=1067&width=800,https://example/file/56755a972fefe61b91380e94df8481e8?quality=75&height=1067&width=800,https://example/file/4f61adf'
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
					hash: 'https://example/file/images/68bf124a0517bffaa5fe1dc7ac8707db.jpg?brightness=0.96&quality=75&trim=1&height=1067&width=800,https://example/file/images/5464df73e16e82b6282309eac5588217.jpg?quality=75&height=1067&width=800,https://cdn.'
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
