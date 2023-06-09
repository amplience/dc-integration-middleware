import { formatMoneyString } from '../../../../common/util'
import slugify from 'slugify'
import { Category, CustomerGroup, Image, Product, Variant } from '../../../../common/types'
import { BigCommerceCorsCategoryTreeItem, BigCommerceCorsImage, BigCommerceCorsProduct, BigCommerceCorsVariant } from './types'
import _ from 'lodash'

/**
 * Map a bigcommerce category to the common category type.
 * @param category The bigcommerce category
 * @returns The common category
 */
export const mapCategory = (category: BigCommerceCorsCategoryTreeItem): Category => {
	return {
		id: `${category.entityId}`,
		name: category.name,
		slug: slugify(category.name, { lower: true }),
		children: category.children.map(mapCategory),
		products: []
	}
}

export const mapImage = (image: BigCommerceCorsImage): Image => {
	return {
		url: image.urlOriginal
	}
}

/**
 * Map a bigcommerce product variant to the common product variant type.
 * @param variant The bigcommerce product variant
 * @param product The bigcommerce product
 * @returns The common variant
 */
export const mapVariant = (variant: BigCommerceCorsVariant, product: BigCommerceCorsProduct): Variant => {
	const listPrice = formatMoneyString(variant.prices.price.value, { currency: variant.prices.price.currencyCode });
	return {
		id: `${variant.entityId}`,
		sku: `${variant.sku}`,
		listPrice: listPrice,
		salePrice: variant.prices.salePrice ? formatMoneyString(variant.prices.salePrice.value, { currency: variant.prices.salePrice.currencyCode }) : listPrice,
		// attributesx: variant.option_values.map(opt => ({
		//     name: opt.option_display_name.toLowerCase(),
		//     value: opt.label
		// })),
		// attributes: _.keyBy(variant.option_values, ''),
		attributes: {},
		images: variant.defaultImage ? [mapImage(variant.defaultImage)] : product.images?.edges?.map((edge) => mapImage(edge.node))
	}
}

/**
 * Map a bigcommerce product to the common product variant type.
 * @param product The bigcommerce product
 * @returns The common variant
 */
export const mapVariantProduct = (product: BigCommerceCorsProduct): Variant => {
	return {
		id: `${product.entityId}`,
		sku: `${product.sku}`,
		listPrice: formatMoneyString(product.prices.price.value, { currency: product.prices.price.currencyCode }),
		salePrice: formatMoneyString(product.prices.salePrice.value, { currency: product.prices.salePrice.currencyCode }),
		// attributesx: variant.option_values.map(opt => ({
		//     name: opt.option_display_name.toLowerCase(),
		//     value: opt.label
		// })),
		// attributes: _.keyBy(variant.option_values, ''),
		attributes: {},
		images: product.images?.edges?.map((edge) => mapImage(edge.node))
	}
}

/**
 * Map a bigcommerce product to the common product type
 * @param product The bigcommerce product
 * @returns The common product
 */
export const mapProduct = (product: BigCommerceCorsProduct): Product => {
	return product && {
		id: `${product.entityId}`,
		shortDescription: product.description,
		longDescription: product.description,
		slug: slugify(product.name, { lower: true }),
		name: product.name,
		categories: [],
		variants: product.variants?.edges?.map(edge => mapVariant(edge.node, product)) || [mapVariantProduct(product)]
	}
}

/**
 * Map a bigcommerce customer group to the common customer group type
 * @param group The bigcommerce customer group
 * @returns The common customer group
 */
/**
export const mapCustomerGroup = (group: BigCommerceCustomerGroup): CustomerGroup => ({
	id: `${group.id}`,
	name: group.name
})
*/