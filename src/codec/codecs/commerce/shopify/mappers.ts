import { 
	Category, 
	CustomerGroup, 
	Product, 
	Variant,
	Image
} from '../../../../common/types'
import { formatMoneyString } from '../../../../common/util'
import { 
	ShopifyCollection, 
	ShopifyImage, 
	ShopifyPrice, 
	ShopifyProduct, 
	ShopifySegment, 
	ShopifyVariant 
} from './types'
import { Dictionary } from 'lodash'

/**
 * Extracts a Resource ID from a globally unique GraphQL ID.
 * @param id GUID
 * @returns Resource ID
 */
const extractID = (id: string): string => {
	if (id == null) {
		return null
	}

	const split = id.split('/')
	return split[split.length - 1]
}

/**
 * Map a Shopify price to the common price type.
 * @param price The Shopify price
 * @returns The common price
 */
export const mapPrice = (price: ShopifyPrice): string => {
	return formatMoneyString(price.amount, { currency: price.currencyCode })
}

/**
 * Map a Shopify collection to the common category type.
 * @param collection The Shopify collection
 * @returns The common category
 */
export const mapCategory = (collection: ShopifyCollection): Category => {
	return {
		id: extractID(collection.id),
		slug: collection.handle,
		name: collection.title,
		image: collection.image,
		children: [],
		products: []
	}
}

/**
 * Map a Shopify image to the common image type.
 * @param image The Shopify image
 * @returns The common image
 */
export const mapImage = (image: ShopifyImage): Image => ({
	id: extractID(image.id),
	url: image.url,
	altText: image.altText
} as Image)

/**
 * Map a Shopify product variant to the common product variant type.
 * @param variant The Shopify product variant
 * @param sharedImages Images shared between each variant
 * @returns The common variant
 */
export const mapVariant = (variant: ShopifyVariant, sharedImages: ShopifyImage[]): Variant => {
	const attributes: Dictionary<string> = {}

	for (const option of variant.selectedOptions) {
		attributes[option.name] = option.value
	}
	
	return {
		id: extractID(variant.id),
		sku: variant.sku || extractID(variant.id),
		listPrice: mapPrice(variant.price ?? variant.unitPrice),
		salePrice: mapPrice(variant.compareAtPrice ?? variant.price ?? variant.unitPrice),
		attributes: attributes,
		images: (variant.image ? [variant.image, ...sharedImages] : sharedImages).map(mapImage)
	}
}

/**
 * Map a Shopify product to the common product type.
 * @param product The Shopify product
 * @returns The common product
 */
export const mapProduct = (product: ShopifyProduct | null): Product | null => {
	if (product == null) return null

	const sharedImages = product.images.edges.filter(image => 
		product.variants.edges.findIndex(variant => variant.node.image.id === image.node.id) === -1
	).map(edge => edge.node)

	return {
		id: extractID(product.id),
		name: product.title,
		slug: product.handle,
		categories: product.collections.edges.map(collection => mapCategory(collection.node)),
		variants: product.variants.edges.map(variant => mapVariant(variant.node, sharedImages)),
		shortDescription: product.description,
		longDescription: product.description
	}
}

/**
 * Map a Shopify segment to the common customer group type
 * @param segment The Shopify segment
 * @returns The common customer group
 */
export const mapCustomerGroup = (segment: ShopifySegment): CustomerGroup => {
	return {
		id: extractID(segment.id),
		name: segment.name
	}
}