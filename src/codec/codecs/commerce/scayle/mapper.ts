import { Category, Product, Variant } from '../../../../common/types'
import { ScaylaProductCategoryValue, ScaylaProductVariant, ScayleCategory, ScayleProduct } from './types'
import { formatMoneyString } from '../../../../common/util'
import { CodecPropertyConfig } from '../../core'
import { CodecConfig } from '.'

export const mapProduct = (product: ScayleProduct, config: CodecPropertyConfig<CodecConfig>): Product | null => {
	if (!product) {
		return null
	}

	const images = product.images?.map((image) => {
		const absUrlRegex = new RegExp('^(?:[a-z+]+:)?//', 'i')
		const basePath = config.image_base_path
			? config.image_base_path
			: `https://${config.tenant_space}.cdn.aboutyou.cloud`

		return {
			url: absUrlRegex.test(image.hash) ? image.hash : `${basePath}/${image.hash}`
		}
	})

	return {
		id: String(product.id),
		name: product.attributes?.name?.values?.label,
		slug: product.referenceKey,
		categories: product.attributes?.category?.values?.map(mapProductCategory) || [],
		variants: product.variants?.map((variant) => mapProductVariants({ ...variant, images })) || [],
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

export const mapProductVariants = (variant: ScaylaProductVariant): Variant => {
	return {
		id: String(variant.id),
		sku: variant.referenceKey,
		listPrice: formatMoneyString(variant.price?.withTax, {
			currency: variant.price?.currencyCode
		}),
		salePrice: formatMoneyString(variant.price?.withTax, {
			currency: variant.price?.currencyCode
		}),
		attributes: {},
		images: variant.images
	}
}

export const mapCategory = (category: ScayleCategory): Category => {
	return {
		id: String(category.id),
		name: category.name,
		slug: category.slug,
		children: category.children?.map(mapCategory) || [],
		products: [],
		showInMenu: !category.isHidden
	}
}
