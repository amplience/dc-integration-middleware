import { Category, Product, Variant } from '../../../../common/types'
import { ScaylaProductCategoryValue, ScaylaProductVariant, ScayleCategory, ScayleProduct } from './types'
import { formatMoneyString } from '../../../../common/util'

export const mapProduct = (product: ScayleProduct): Product | null => {
	if (!product) {
		return null
	}

	return {
		id: String(product.id),
		name: product.attributes?.name?.values?.label,
		slug: product.referenceKey,
		categories: product.attributes?.category?.values?.map(mapProductCategory),
		variants: product.attributes?.variants?.map(mapProductVariants),
		shortDescription: product.attributes?.description?.values?.label,
		longDescription: product.attributes?.description?.values?.label
	}
}

export const mapProductCategory = (categoryValue: ScaylaProductCategoryValue): Category => {
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

export const mapProductVariants = ({ referenceKey, price }: ScaylaProductVariant): Variant => {
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

export const mapCategory = (category: ScayleCategory): Category => {
	return {
		id: String(category.id),
		name: category.name,
		slug: category.slug,
		children: category.children.map(mapCategory),
		products: [],
		showInMenu: !category.isHidden
	}
}
