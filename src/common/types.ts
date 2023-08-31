import { Dictionary } from 'lodash'

/**
 * Simple image type with an URL and thumbnail URL.
 */
export type Image = {
	url: string
	thumb?: string
}

/**
 * Base resource type with identifiable ID and Name.
 */
export type Identifiable = {
	id: string
	name: string
}

/**
 * Customer Group
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type CustomerGroup = Identifiable & {}

/**
 * Commerce Object with a slug
 */
export type CommerceObject = Identifiable & {
	slug: string
}

/**
 * Product with descriptions, images, categories and variants.
 */
export type Product = CommerceObject & {
	shortDescription?: string
	longDescription?: string
	imageSetId?: string
	categories: Category[]
	variants: Variant[]
}

/**
 * Variant identified by SKU, with price, images and attributes.
 */
export type Variant = {
	id: string
	sku: string
	listPrice: string
	salePrice: string
	defaultImage?: Image
	images: Image[]
	attributes: Dictionary<string>
}

/**
 * Category with images, products, children and a parent.
 */
export type Category = CommerceObject & {
	parent?: Category
	image?: Image
	children: Category[]
	products: Product[]
	showInMenu: boolean
}

/**
 * Promotion with description, code, an image and activity status.
 */
export type Promotion = Identifiable & {
	description: string
	promoCode?: string
	isActive: boolean
	image?: Image
}

/**
 * Get Attribute method arguments.
 */
export type GetAttributeArgs = {
	name: string
}

/**
 * Common method arguments.
 */
export type CommonArgs = {
	locale?: string
	language?: string
	country?: string
	currency?: string
	segment?: string
}

/**
 * Common method arguments for fetching a commerce object.
 */
export type GetCommerceObjectArgs = CommonArgs & {
	id?: string
	slug?: string
}

/**
 * Method arguments for fetching products.
 */
export type GetProductsArgs = CommonArgs & PaginationArgs & {
	keyword?: string
	productIds?: string
	category?: Category
}

/**
 * Method arguments for pagination. These are also returned with paginated results, and should be used when requesting future pages.
 * 
 * If the pageNum is undefined, it will be 0.
 * If the cursor is undefined, the desired page number will still be fetched but this cursor will be used to fetch it faster.
 * If the cursorPage is undefined, cursor cannot be used and will be treated as undefined.
 * If pageSize is undefined, it will select a default value.
 * If pageCount is undefined, all items will be fetched.
 * 
 * The following fields are only returned by the request:
 * Total may be undefined. It is always defined if the requested page is the last.
 */
export type PaginationArgs = {
	pageNum?: number
	cursor?: string
	cursorPage?: number
	pageSize?: number
	pageCount?: number

	total?: number
}