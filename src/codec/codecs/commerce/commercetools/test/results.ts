export const exampleCustomerGroups = [
	{
		createdAt: '2020-04-14T17:38:16.220Z',
		createdBy: {
			clientId: 'client',
			isPlatformClient: false,
		},
		id: 'b2b-group',
		key: 'b2b',
		lastModifiedAt: '2020-04-14T17:38:16.220Z',
		lastModifiedBy: {
			clientId: 'client',
			isPlatformClient: false,
		},
		name: 'b2b',
		version: 1,
	},
	{
		createdAt: '2020-04-14T17:38:16.225Z',
		createdBy: {
			clientId: 'client',
			isPlatformClient: false,
		},
		id: 'silver-group',
		key: 'silver',
		lastModifiedAt: '2020-04-14T17:38:16.225Z',
		lastModifiedBy: {
			clientId: 'client',
			isPlatformClient: false,
		},
		name: 'Silver',
		version: 1,
	},
]

export const exampleCategoryTree = [
	{
		children: [
			{
				children: [],
				id: 'mens-accessories-id',
				name: 'Men\'s Accessories',
				products: [],
				slug: 'mens-accessories',
				showInMenu: true,
			}
		],
		id: 'men-id',
		name: 'Men',
		products: [],
		slug: 'root-men',
		showInMenu: true,
	}
]

export const exampleCategoryTreeEs = [
	{
		children: [
			{
				children: [],
				id: 'mens-accessories-id',
				name: 'Hombre Accessories',
				products: [],
				slug: 'mens-accessories',
				showInMenu: true,
			}
		],
		id: 'men-id',
		name: 'Hombre',
		products: [],
		slug: 'root-men',
		showInMenu: true,
	}
]

export const exampleProduct = (id: string) => ({
	categories: [],
	id: id,
	longDescription: 'Example description.\n\n',
	shortDescription: 'Example description.\n\n',
	name: 'DECIEM PUMP (FOR HIGHER-VISCOSITY NIOD SERUMS, 30ML BOTTLE) - 1PC (P)',
	slug: 'pump-for-higher-viscosity-niod-serums-30ml-bottle-1pc-p',
	variants: [
		{
			attributes: {
				articleNumberMax: '0CAIS5',
				baseId: '0CAIS5',
			},
			images: [
				{
					dimensions: {
						h: 900,
						w: 900,
					},
					url: 'https://cdn.media.amplience.net/i/willow/nid-pump',
				},
			],
			listPrice: '$2.50',
			salePrice: '$2.50',
			sku: '0CAIS5',
			id: '1'
		},
	],
})