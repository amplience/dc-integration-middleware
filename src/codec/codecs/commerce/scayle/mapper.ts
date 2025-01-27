import { Category, Product, Variant } from '../../../../common/types'
import { ScaylaProductCategory, ScaylaProductVariant, ScayleCategory, ScayleProduct } from './types'
import { formatMoneyString } from '../../../../common/util'
import { CodecPropertyConfig } from '../../core'
import { CodecConfig } from '.'

const decimalShiftDenomination = (price: string) => {
	return Number(price) > 0 ? Number(price) / 100 : undefined
}

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
		categories: product.categories?.flat()?.map(mapProductCategories) || [],
		variants: product.variants?.map((variant) => mapProductVariants({ ...variant, images })) || [],
		shortDescription: product.attributes?.description?.values?.label,
		longDescription: product.attributes?.description?.values?.label
	}
}

export const mapProductCategories = (category: ScaylaProductCategory): Category => {
	return {
		id: String(category.categoryId),
		slug: category.categorySlug,
		name: category.categoryName,
		image: undefined,
		children: [],
		products: [],
		showInMenu: !category.categoryHidden
	}
}

export const mapProductVariants = (variant: ScaylaProductVariant): Variant => {
	return {
		id: String(variant.id),
		sku: variant.referenceKey,
		listPrice: formatMoneyString(decimalShiftDenomination(variant.price?.withTax), {
			currency: variant.price?.currencyCode
		}),
		salePrice: formatMoneyString(decimalShiftDenomination(variant.price?.withTax), {
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
