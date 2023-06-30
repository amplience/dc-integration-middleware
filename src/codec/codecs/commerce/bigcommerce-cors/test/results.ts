// BigCommerce Category Hierarchy result
export const exampleCategoryTree = [
	{
		id: '23',
		name: 'Shop All',
		slug: 'shop-all',
		children: [],
		products: []
	},
	{
		id: '18',
		name: 'Bath',
		slug: 'bath',
		children: [
			{
				id: '24',
				name: 'Bath Utilities',
				slug: 'bath-utilities',
				children: [],
				products: []
			},
			{
				id: '25',
				name: 'Toothbrushes',
				slug: 'toothbrushes',
				children: [
					{
						id: '26',
						name: 'Electric',
						slug: 'electric',
						children: [],
						products: []
					}
				],
				products: []
			}
		],
		products: []
	},
	{
		id: '19',
		name: 'Garden',
		slug: 'garden',
		children: [],
		products: []
	},
	{
		id: '21',
		name: 'Kitchen',
		slug: 'kitchen',
		children: [],
		products: []
	},
	{
		id: '20',
		name: 'Publications',
		slug: 'publications',
		children: [],
		products: []
	},
	{
		id: '22',
		name: 'Utility',
		slug: 'utility',
		children: [],
		products: []
	}
]

// BigCommerce Product result
export const exampleProduct = (id: string) => ({
	id: id,
	shortDescription: '<div class="s-row">\n<div class="s-column">\n<p class="s-text">Rib knit wool beanie in navy. Embroidered patch in pink at rolled brim.<br /><br />Supplier color: Navy/Pink</p>\n</div>\n</div>\n<div class="s-row">\n<div class="s-column">\n<p class="s-text">100% wool.</p>\n<p class="s-text">Imported.</p>\n</div>\n</div>\n<p class="s-text">&nbsp;</p>',
	longDescription: '<div class="s-row">\n<div class="s-column">\n<p class="s-text">Rib knit wool beanie in navy. Embroidered patch in pink at rolled brim.<br /><br />Supplier color: Navy/Pink</p>\n</div>\n</div>\n<div class="s-row">\n<div class="s-column">\n<p class="s-text">100% wool.</p>\n<p class="s-text">Imported.</p>\n</div>\n</div>\n<p class="s-text">&nbsp;</p>',
	slug: 'beanie',
	name: 'Beanie',
	categories: [],
	variants: [{
		id: String(Number(id) + 1000),
		sku: id + 'Mvariant',
		listPrice: '$22.00',
		salePrice: '$22.00',
		attributes: {},
		images: [
			{
				url: 'https://cdn11.bigcommerce.com/s-ivhpe1uqls/images/stencil/original/products/132/446/Hat-front-black__34181__49124.1603822817.png'
			},
			{
				url: 'https://cdn11.bigcommerce.com/s-ivhpe1uqls/images/stencil/original/products/132/452/Hat-left-black__86563__42762.1603822817.png'
			},
			{
				url: 'https://cdn11.bigcommerce.com/s-ivhpe1uqls/images/stencil/original/products/132/456/Hat-back-black__73249__27210.1603822817.png'
			},
			{
				url: 'https://cdn11.bigcommerce.com/s-ivhpe1uqls/images/stencil/original/products/132/459/Hat-right-black__47486__46151.1603822817.png'
			},
			{
				url: 'https://cdn11.bigcommerce.com/s-ivhpe1uqls/images/stencil/original/products/132/448/Hat-front-white__62014__04169.1603822817.png'
			},
			{
				url: 'https://cdn11.bigcommerce.com/s-ivhpe1uqls/images/stencil/original/products/132/450/Hat-left-white__24819__61058.1603822817.png'
			},
			{
				url: 'https://cdn11.bigcommerce.com/s-ivhpe1uqls/images/stencil/original/products/132/454/Hat-back-white__89051__65142.1603822817.png'
			},
			{
				url: 'https://cdn11.bigcommerce.com/s-ivhpe1uqls/images/stencil/original/products/132/458/Hat-right-white__01475__34887.1603822817.png'
			}
		]
	}]
})

export const exampleProducts = (count: number, start = 0) => {
	return Array.from({length: count}).map((_, index) => exampleProduct((start + index).toString()))
}