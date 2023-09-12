import { formatMoneyString } from '../../../../common/util'
import slugify from 'slugify'
import { Category, Image, Product, Variant } from '../../../../common/types'
import { BigCommerceCorsCategoryTreeItem, BigCommerceCorsImage, BigCommerceCorsOption, BigCommerceCorsProduct, BigCommerceCorsVariant } from './types'
import _, { Dictionary } from 'lodash'
import { Paginated } from '@/common/graphql'

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
		products: [],
		showInMenu: true
	}
}

/**
 * Map a bigcommerce image to the common image type.
 * @param image The bigcommerce image
 * @returns The common image
 */
export const mapImage = (image: BigCommerceCorsImage): Image => {
	return {
		url: image.urlOriginal
	}
}

/**
 * Map bigcommerce variant options to the common product variant attribute type.
 * Note: Assumes a single active value for each option.
 * @param options The bigcommerce product variant options
 * @returns The common variant attributes
 */
const mapOptions = (options: Paginated<BigCommerceCorsOption>): Dictionary<string> => {
	const result: Dictionary<string> = {}

	for (const edge of options.edges) {
		const node = edge.node

		if (node.values?.edges && node.values.edges.length > 0) {
			const name = node.displayName
			const value = node.values.edges[0].node.label

			result[name] = value
		}
	}
	
	return result
}

/**
 * Map a bigcommerce product variant to the common product variant type.
 * @param variant The bigcommerce product variant
 * @param product The bigcommerce product
 * @returns The common variant
 */
export const mapVariant = (variant: BigCommerceCorsVariant, product: BigCommerceCorsProduct): Variant => {
	const listPrice = formatMoneyString(variant.prices.price.value, { currency: variant.prices.price.currencyCode })
	return {
		id: `${variant.entityId}`,
		sku: `${variant.sku}`,
		listPrice: listPrice,
		salePrice: variant.prices.salePrice ? formatMoneyString(variant.prices.salePrice.value, { currency: variant.prices.salePrice.currencyCode }) : listPrice,
		attributes: mapOptions(variant.options),
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