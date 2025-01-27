export interface ScayleProduct {
	id: number
	masterKey: string
	referenceKey: string
	attributes: ScayleProductAttibutes
	variants: ScaylaProductVariant[]
	images: { hash: string }[]
	categories: ScaylaProductCategory[][]
}

export interface ScayleProductAttibutes {
	name: ScayleProductAttribute
	description: ScayleProductAttribute
	category: ScaylaProductAttributeCategory
	images: { hash: string }[]
	customData: Record<string, unknown>
}

export interface ScayleProductAttribute {
	values: {
		value: string
		label: string
	}
}

export interface ScaylaProductCategory {
	categoryId: number
	categoryName: string
	categorySlug: string
	categoryUrl: string
	categoryHidden: string
	categoryProperties: unknown[]
}

export interface ScaylaProductAttributeCategory {
	id: number
	key: string
	values: ScaylaProductCategoryValue[]
}

export interface ScaylaProductCategoryValue {
	id: number
	label: string
	value: string
}

export interface ScaylaProductVariant {
	id: number
	referenceKey: string
	stock: {
		supplierId: number
		warehouseId: number
		quantity: number
		isSellableWithoutStock: boolean
		expectedAvailabilityAt: unknown
	}
	price: ScaylaProductVariantPrice
	appliedReductions: unknown[]
	images: { url: string }[]
}

export interface ScaylaProductVariantPrice {
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
