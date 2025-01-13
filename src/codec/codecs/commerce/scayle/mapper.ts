import { Category, Product, Variant } from '../../../../common/types'
import { ScaylaProductCategoryValue, ScaylaProductVariant, ScayleProduct } from './types'
import { formatMoneyString } from '../../../../common/util'

export const mapProduct = (product: ScayleProduct): Product | null => {
	if (!product) {
		return null
	}

	return {
		id: String(product.id),
		name: product.attributes?.name?.values?.label,
		slug: product.referenceKey,
		categories: product.attributes?.category?.values?.map(mapCategory),
		variants: product.attributes?.variants?.map(mapVariants),
		shortDescription: product.attributes?.description?.values?.label,
		longDescription: product.attributes?.description?.values?.label
	}
}

export const mapCategory = (categoryValue: ScaylaProductCategoryValue): Category => {
	return {
		id: String(categoryValue.id),
		slug: undefined,
		name: categoryValue.label,
		image: undefined,
		children: [],
		products: [],
		showInMenu: true
	}
}

export const mapVariants = ({ referenceKey, price }: ScaylaProductVariant): Variant => {
	return {
		id: referenceKey,
		sku: referenceKey,
		listPrice: formatMoneyString(price.withTax, {
			currency: price.currencyCode
		}),
		salePrice: formatMoneyString(price.withTax, {
			currency: price.currencyCode
		}),
		attributes: undefined,
		images: undefined
	}
}
