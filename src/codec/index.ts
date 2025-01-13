import _ from 'lodash'
import { CodecTypes, CodecType } from './codecs/core'
import { IntegrationError } from '../common/errors'
import { API, CommerceAPI } from '../common'

const codecs = new Map<CodecTypes, CodecType[]>()
codecs[CodecTypes.commerce] = []

const hashExcludedConfig = [
	'locale',
	'country',
	'currency',
	'segment',
	'id',
	'slug',
	'keyword',
	'productIds',
	'category',

	'pageNum',
	'pageSize',
	'pageCount',
	'cursor',
	'cursorPage'
]

/**
 * Get all the codecs with a given type
 * @param type Codec type
 * @returns All registered codecs that match the type
 */
// public interface
export const getCodecs = (type?: CodecTypes): CodecType[] => {
	return type ? codecs[type] : _.flatMap(codecs)
}

/**
 * Register a codec type object.
 * @param codec Codec type object
 */
export const registerCodec = (codec: CodecType) => {
	if (!codecs[codec.type].includes(codec)) {
		codecs[codec.type].push(codec)
	}
}

// Create a cache of apis so we can init them once only, assuming some initial load time (catalog etc)
const apis = new Map<any, API>()

/**
 * Mask sensitive data in an object.
 * Note: only affects fields containing `secret`, `token` or `password` in their keys.
 * @param obj Object to copy with sensitive fields removed.
 * @returns The object with any sensitive fields removed.
 */
const maskSensitiveData = (obj: any) => {
	const keys = Object.keys(obj)

	for (const key of keys) {
		const keyLower = key.toLowerCase()
		if (keyLower.indexOf('password') !== -1 || keyLower.indexOf('secret') !== -1 || keyLower.indexOf('token') !== -1) {
			obj[keyLower] = '**** redacted ****'
		}
	}
}

/**
 * Get an API given a configuration object and a codec type.
 * It attempts to match a registered codec by the `vendor` property first, if present.
 * If not, it attempts to match based on the shape of the codec object.
 * @param config API configuration
 * @param type Type of codec to find
 * @returns A new API for the given configuration.
 */
export const getCodec = async (config: any, type: CodecTypes): Promise<API> => {
	const codecs = getCodecs(type)
	let codec: CodecType

	if ('vendor' in config) {
		const vendorCodec = codecs.find((codec) => codec.vendor === config.vendor)
		if (!vendorCodec) {
			throw new IntegrationError({
				message: `codec not found for vendor [ ${config.vendor} ]`,
				helpUrl: 'https://github.com/amplience/dc-integration-middleware'
			})
		}

		// Check that all required properties are there.
		const difference = _.difference(Object.keys(vendorCodec.properties), Object.keys(config))
		if (difference.length > 0) {
			throw new IntegrationError({
				message: `configuration missing properties required for vendor [ ${config.vendor} ]: [ ${difference.join(', ')} ]`,
				helpUrl: 'https://github.com/amplience/dc-integration-middleware'
			})
		}

		codec = vendorCodec
	}
	// end novadev-450
	else {
		const codecsMatchingConfig: CodecType[] = codecs.filter(
			(c) => _.difference(Object.keys(c.properties), Object.keys(config)).length === 0
		)
		if (codecsMatchingConfig.length === 0 || codecsMatchingConfig.length > 1) {
			throw new IntegrationError({
				message: `[ ${codecsMatchingConfig.length} ] codecs found (expecting 1) matching schema:\n${JSON.stringify(maskSensitiveData(config), undefined, 4)}`,
				helpUrl: 'https://github.com/amplience/dc-integration-middleware'
			})
		}
		codec = codecsMatchingConfig.pop()
	}

	const configHash = Object.keys(config)
		.filter((key) => hashExcludedConfig.indexOf(key) === -1)
		.map((key) => config[key])
		.join('')
	console.log(`[ dc-integration-middleware ] creating codec: ${codec.vendor}...`)
	return (apis[configHash] = apis[configHash] || (await codec.getApi(config)))
}

/**
 * Get a commerce API given a configuration object.
 * It attempts to match a registered codec by the `vendor` property first, if present.
 * If not, it attempts to match based on the shape of the codec object.
 * @param config Configuration object for the commerce API
 * @returns A new commerce API for the given configuration
 */
export const getCommerceCodec = async (config: any): Promise<CommerceAPI> =>
	(await getCodec(config, CodecTypes.commerce)) as CommerceAPI

// === End public interface ===

import CommerceToolsCodecType from './codecs/commerce/commercetools'
registerCodec(new CommerceToolsCodecType())

import RestCodecType from './codecs/commerce/rest'
registerCodec(new RestCodecType())

import SFCCCodecType from './codecs/commerce/sfcc'
registerCodec(new SFCCCodecType())

import BigCommerceCommerceCodecType from './codecs/commerce/bigcommerce'
registerCodec(new BigCommerceCommerceCodecType())

import BigCommerceCorsCommerceCodecType from './codecs/commerce/bigcommerce-cors'
registerCodec(new BigCommerceCorsCommerceCodecType())

import ShopifyCommerceCodecType from './codecs/commerce/shopify'
registerCodec(new ShopifyCommerceCodecType())

import ScayleCommerceCodecType from './codecs/commerce/scayle'
registerCodec(new ScayleCommerceCodecType())

// Re-export common codec functions.
export * from './codecs/common'
export * from './codecs/core'
export * from './codecs/codec-error'
