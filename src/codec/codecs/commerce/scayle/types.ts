export interface ScayleProduct {
	id: number
	masterKey: string
	referenceKey: string
	attributes: ScayleProductAttibutes
	variants: ScayleProductVariant[]
	images: { hash: string }[]
	categories: ScayleProductCategory[][]
}

export interface ScayleProductAttibutes {
	name: ScayleProductAttribute
	description: ScayleProductAttribute
	category: ScayleProductAttributeCategory
	images: { hash: string }[]
	customData: Record<string, unknown>
}

export interface ScayleProductAttribute {
	values: {
		value: string
		label: string
	}
}

export interface ScayleProductCategory {
	categoryId: number
	categoryName: string
	categorySlug: string
	categoryUrl: string
	categoryHidden: string
	categoryProperties: unknown[]
}

export interface ScayleProductAttributeCategory {
	id: number
	key: string
	values: ScayleProductCategoryValue[]
}

export interface ScayleProductCategoryValue {
	id: number
	label: string
	value: string
}

export interface ScayleProductVariant {
	id: number
	referenceKey: string
	stock: {
		supplierId: number
		warehouseId: number
		quantity: number
		isSellableWithoutStock: boolean
		expectedAvailabilityAt: unknown
	}
	price: ScayleProductVariantPrice
	appliedReductions: unknown[]
	images: { url: string }[]
}

export interface ScayleProductVariantPrice {
	currencyCode: string
	withTax: string
	withoutTax: number
	recommendedRetailPrice: number
	tax: {
		vat: {
			amount: number
			rate: number
		}
	}
}

export interface ScayleCategory {
	id: number
	path: string
	name: string
	slug: string
	parentId: number
	rootlineIds: number[]
	childrenIds: number[]
	properties: unknown[]
	isHidden: boolean
	depth: number
	supportedFilter: unknown[]
	shopLevelCustomData: unknown
	countryLevelCustomData: unknown
	children: ScayleCategory[]
}
