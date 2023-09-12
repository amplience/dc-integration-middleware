import { Paginated } from '../../../../common/graphql'

export interface Measurement {
	unit: string
	value: number
}

type ID = string;

export interface BigCommerceCorsCategory {
	/** The description of this category. */
	description: string

	/** The id category. */
	entityId: number

	/** The name of category. */
	name: string

	/** Path assigned to this category */
	path: string
}

export interface BigCommerceCorsCategoryTreeItem extends BigCommerceCorsCategory {
	/** Subcategories of this category. */
	children?: BigCommerceCorsCategoryTreeItem[]

	/** If a category has children. */
	hasChildren: boolean

	/** The category image. */
	image?: BigCommerceCorsImage

	/** The number of products in this category. */
	productCount: number
}

export interface BigCommerceCorsSeoDetails {
	/** Meta description. */
	metaDescription: string

	/** Meta keywords. */
	metaKeywords: string

	/** Page title. */
	pageTitle: string
}

export interface BigCommerceCorsImage {
	/** Text description of an image that can be used for SEO and/or accessibility purposes. */
	altText: string

	/** Indicates whether this is the primary image. */
	isDefault: boolean

	/** Absolute path to image using store CDN. */
	/** Could be used in future for thumb url or size parameterized image. */
	/**url (width: Int!, height: Int): String! */

	/** Absolute path to original image using store CDN. */
	urlOriginal: string
}

export interface BigCommerceCorsMoney {
	/** Currency code of the current money. */
	currencyCode: string
	
	/** The amount of money. */
	value: number
	
}

export interface BigCommerceCorsMoneyRange {
	/** Maximum money object. */
	max: BigCommerceCorsMoney
	
	/** Minimum money object. */
	min: BigCommerceCorsMoney
}

export interface BigCommerceCorsPrices {
	/** Original price of the product. */
	basePrice?: BigCommerceCorsMoney

	/** Minimum advertised price of the product. */
	mapPrice?: BigCommerceCorsMoney

	/** Calculated price of the product. Calculated price takes into account basePrice, salePrice, rules (modifier, option, option set) that apply to the product configuration, and customer group discounts. It represents the in-cart price for a product configuration without bulk pricing rules. */
	price: BigCommerceCorsMoney
	
	/** Product price min/max range. */
	priceRange: BigCommerceCorsMoneyRange

	/** Retail price of the product. */
	retailPrice?: BigCommerceCorsMoney

	/** Product retail price min/max range. */
	retailPriceRange?: BigCommerceCorsMoneyRange

	/** Sale price of the product. */
	salePrice?: BigCommerceCorsMoney

	/** The difference between the retail price (MSRP) and the current price, which can be presented to the shopper as their savings. */
	saved?: BigCommerceCorsMoney
}

export interface BigCommerceCorsAggregatedInventory {
	/** 
	 * Number of available products in stock. This can be 'null' if inventory is not set or
	 * if the store's Inventory Settings disable displaying stock levels on the storefront. 
	 */
	availableToSell: number

	/** 
	 * Indicates a threshold low-stock level. This can be 'null' if the inventory warning level
	 * is not set or if the store's Inventory Settings disable displaying stock levels on the
	 * storefront. 
	 */
	warningLevel: number
}

export interface BigCommerceCorsVariantInventory {
	/** Aggregated product inventory information. This data may not be available if not set or if the store's Inventory Settings have disabled displaying stock levels on the storefront. */
	aggregated?: BigCommerceCorsAggregatedInventory

	/** Indicates whether this product is in stock. */
	isInStock: boolean
}

export interface BigCommerceCorsProductInventory {
	/** Aggregated product inventory information. This data may not be available if not set or if the store's Inventory Settings have disabled displaying stock levels on the storefront. */
	aggregated?: BigCommerceCorsAggregatedInventory

	/** Indicates whether this product's inventory is being tracked on variant level. If true, you may wish to check the variants node to understand the true inventory of each individual variant, rather than relying on this product-level aggregate to understand how many items may be added to cart. */
	hasVariantInventory: boolean
	
	/** Indicates whether this product is in stock. */
	isInStock: boolean
}

export interface BigCommerceOptionValue {
	/** Unique ID for the option value. */
	entityId: number

	/** Label for the option value. */
	label: string
}

export interface BigCommerceCorsOption {
	/** Display name for the option. */
	displayName: string

	/** Unique ID for the option. */
	entityId: number

	/** One of the option values is required to be selected for the checkout. */
	isRequired: boolean

	/** Option values. */
	values: Paginated<BigCommerceOptionValue>
}

export interface BigCommerceCorsVariant {
	/** Default image for a variant. */
	defaultImage?: BigCommerceCorsImage

	/** The variant's depth. If a depth was not explicitly specified on the variant, this will be the product's depth. */
	depth?: Measurement

	/** Id of the variant. */
	entityId: number

	/** Global trade item number. */
	gtin?: string

	/** The variant's height. If a height was not explicitly specified on the variant, this will be the product's height. */
	height?: Measurement

	/** The ID of an object */
	id: ID

	/** Variant inventory */
	inventory: BigCommerceCorsVariantInventory

	/** Whether the product can be purchased */
	isPurchasable: boolean

	/** Manufacturer part number. */
	mpn?: string

	/** The options which define a variant. */
	options: Paginated<BigCommerceCorsOption>

	/** Variant prices */
	prices: BigCommerceCorsPrices /** currencyCode, includeTax */

	/** Sku of the variant. */
	sku: string

	/** Universal product code. */
	upc?: string

	/** The variant's weight. If a weight was not explicitly specified on the variant, this will be the product's weight. */
	weight?: Measurement

	/** The variant's width. If a width was not explicitly specified on the variant, this will be the product's width. */
	width?: Measurement
}

export interface BigCommerceCorsReviews {
	/** Average rating of the product. */
	averageRating: number

	/** Total number of reviews on product. */
	numberOfReviews: number

	/** Summation of rating scores from each review. */
	summationOfRatings: number
}

export type BigCommerceCorsProductConditionType = 'NEW' | 'REFURBISHED' | 'USED'
export type BigCommerceCorsProductAvailabilityStatus = 'Available' | 'Preorder' | 'Unavailable'

export interface BigCommerceCorsGiftWrapping {
	/** Indicates whether commenting is allowed for the gift wrapping. */
	allowComments: boolean

	/** Gift wrapping id. */
	entityId: number

	/** Gift wrapping name. */
	name: string

	/** Gift wrapping preview image url. */
	previewImageUrl?: string
}

export interface BigCommerceCorsDateTimeExtended {
	utc: string
}

export interface BigCommerceCorsProductAvailability {
	/** A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'. */
	description: string

	/** The availability state of the product. */
	status: BigCommerceCorsProductAvailabilityStatus
}

export interface BigCommerceCorsProductAvailable extends BigCommerceCorsProductAvailability {
	status: 'Available'
}

export interface BigCommerceCorsProductPreOrder extends BigCommerceCorsProductAvailability {
	status: 'Preorder'

	/** The message to be shown in the store when a product is put into the pre-order availability state, e.g. "Expected release date is %%DATE%%" */
	message?: string
	
	/** Product release date */
	willBeReleasedAt?: BigCommerceCorsDateTimeExtended
}

export interface BigCommerceCorsProductUnavailable extends BigCommerceCorsProductAvailability {
	status: 'Unavailable'

	/** The message to be shown in the store when "Call for pricing" is enabled for this product, e.g. "Contact us at 555-5555" */
	message?: string
}

export interface BigCommerceCorsProduct {
	/** Absolute URL path for adding a product to cart. **/
	addToCartUrl: string

	/** Absolute URL path for adding a product to customer's wishlist. **/
	addToWishlistUrl: string 

	/** The availability state of the product. **/
	availabilityV2: BigCommerceCorsProductAvailability

	/** Brand associated with the product. **/
	brand: { entityId: number }

	/** List of categories associated with the product. **/
	categories: Paginated<BigCommerceCorsCategory>

	/** Product condition **/
	condition: BigCommerceCorsProductConditionType

	/** Product creation date **/
	createdAt: BigCommerceCorsDateTimeExtended

	/** Default image for a product. **/
	defaultImage?: BigCommerceCorsImage

	/** Depth of the product. **/
	depth?: Measurement

	/** Description of the product. **/
	description: string

	/** Id of the product. **/
	entityId: number

	/** Gift wrapping options available for the product. **/
	giftWrappingOptions: Paginated<BigCommerceCorsGiftWrapping>

	/** Global trade item number. **/
	gtin?: string

	/** Height of the product. **/
	height?: Measurement

	/** The ID of an object **/
	id: ID

	/** A list of the images for a product. **/
	images: Paginated<BigCommerceCorsImage>

	/** Inventory information of the product. **/
	inventory: BigCommerceCorsProductInventory

	/** Maximum purchasable quantity for this product in a single order. **/
	maxPurchaseQuantity?: number

	/** Minimum purchasable quantity for this product in a single order. **/
	minPurchaseQuantity?: number

	/** Manufacturer part number. **/
	mpn?: string

	/** Name of the product. **/
	name: string

	/** Relative URL path to product page. **/
	path: string

	/** Description of the product in plain text. **/
	plainTextDescription: string //use no character limit

	/** Prices object determined by supplied product ID, variant ID, and selected option IDs. **/
	prices: BigCommerceCorsPrices

	/** Summary of the product reviews, includes the total number of reviews submitted and summation of the ratings on the reviews (ratings range from 0-5 per review). **/
	reviewSummary: BigCommerceCorsReviews

	/** Product SEO details. **/
	seo: BigCommerceCorsSeoDetails

	/** Whether or not the cart call to action should be visible for this product. **/
	showCartAction: boolean

	/** Default product variant when no options are selected. **/
	sku: string

	/** Type of product, ex: physical, digital **/
	type: string

	/** Universal product code. **/
	upc?: string

	/** Variants associated with the product. **/
	variants: Paginated<BigCommerceCorsVariant>

	/** Warranty information of the product. **/
	warranty: string

	/** Weight of the product. **/
	weight?: Measurement

	/** Width of the product. **/
	width?: Measurement
}