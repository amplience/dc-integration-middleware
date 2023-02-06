import { SFCCProduct } from '@/codec/codecs/sfcc/types'
import { GetCommerceObjectArgs, Product, GetProductsArgs, Category, CommonArgs, CustomerGroup, GetVariantsArgs } from './types'

/**
 * TODO
 */
export class Exception {
	exception: string
}

/**
 * TODO
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type API = { }

/**
 * TODO
 */
export type CommerceAPI = API & {
    getProduct:         (args: GetCommerceObjectArgs)       => Promise<Product>
    getProducts:        (args: GetProductsArgs)             => Promise<Product[]>
    getCategory:        (args: GetCommerceObjectArgs)       => Promise<Category>
    getMegaMenu:        (args: CommonArgs)                  => Promise<Category[]>
    getCustomerGroups:  (args: CommonArgs)                  => Promise<CustomerGroup[]>
    getVariants:        (args: GetVariantsArgs)             => Promise<SFCCProduct>
    getRawProducts:     (args: GetProductsArgs)             => Promise<SFCCProduct[]>
}