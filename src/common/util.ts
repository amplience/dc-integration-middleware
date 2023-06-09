import { defaultArgs } from './default-args'

/**
 * Sleep for a period of time in milliseconds.
 * @param delay Delay in milliseconds
 * @returns Promise that resolves after the delay
 */
export const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

/**
 * Format a value with the given currency argument
 * @param money Value to format as currency
 * @param args.currency Currency type
 * @returns Formatted value
 */
export const formatMoneyString = (money, args) =>
	new Intl.NumberFormat(args.locale, {
		style: 'currency',
		currency: args.currency || defaultArgs.currency
	}).format(money)

/**
 * Determine if the code is running on a server.
 * @returns False if the code is running on a browser, true otherwise.
 */
export const isServer = (): boolean => typeof window === 'undefined'

/**
 * Surround a string in double quotes.
 * @param str Input string
 * @returns String surrounded in quotes
 */
export const quote = (str: string) => `"${str}"`

/**
 * Surround elements of a comma separated list in double quotes.
 * @param productIds Comma separated list
 * @returns Comma separated list with quoted items
 */
export const quoteProductIdString = (productIds: string) =>
	productIds.split(',').map(quote).join(',')

/**
 * Flatten the codec config object.
 * @param params Config object
 * @returns Flattened config object
 */
export const flattenConfig = (params: any = undefined): any => {
	let codec = params

	if (params.codec_params) {
		codec = {
			...params.codec_params,
			vendor: params.vendor
		}
	}

	return codec
}
