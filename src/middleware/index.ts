import axios from 'axios'
import { CommerceAPI, PaginationArgs, getCodecs, getCommerceCodec } from '../index'
import { flattenConfig, isServer } from '../common/util'
import { CodecError, CodecErrorType } from '../codec/codecs/codec-error'
import { IntegrationError } from '../common/errors'

let useMiddleware = !!process.env.INTEGRATION_MIDDLEWARE_SERVER

export function enableMiddleware(enable: boolean) {
	useMiddleware = enable
}

/**
 * Get an API for the given configuration.
 * @param config Configuration object
 * @returns API matching the configuration.
 */
const getAPI = async (config: any): Promise<CommerceAPI> => {
	const matchingCodec = getCodecs().find(
		(c) => c.vendor === config.vendor
	)
	if (matchingCodec) {
		config = await matchingCodec.postProcess(config)
	}

	return await getCommerceCodec(config)
}

/**
 * Commerce API method names.
 */
export type CommerceOperation =
	| 'getProduct'
	| 'getProducts'
	| 'getCategory'
	| 'getCategoryTree'
	| 'getCustomerGroups'
	| 'getRawProducts'

/**
 * Error type passed through the middleware as a response.
 */
export interface MiddlewareError {
	type: string
	message: string,
	info?: object
}

/**
 * Convert an error thrown by an integration to one deliverable by the middleware API.
 * @param error The error to convert
 * @returns A middleware API error
 */
const toApiError = (error: Error | CodecError | IntegrationError): MiddlewareError => {
	if ('errorType' in error && error.errorType === 'codec') {
		return {
			type: CodecErrorType[error.type],
			info: error.info,
			message: error.message
		}
	} else if ('errorType' in error && error.errorType === 'integration') {
		return {
			type: 'Integration',
			message: error.message,
			info: {
				helpUrl: error.helpUrl
			}
		}
	} else {
		return {
			type: 'Generic',
			message: error.message,
		}
	}
}

/**
 * Throws a CodecError, IntegrationError or Error delivered by the middleware API.
 * @param error Error delivered by the middleware API
 */
const fromApiError = (error: MiddlewareError): Error | IntegrationError | CodecError => {
	switch (error.type) {
	case 'Integration':
		return new IntegrationError({
			message: error.message,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			helpUrl: (error.info as any).helpUrl
		})
	case 'Generic':
		return new Error(error.message)
	default: {
		// Try parse as a codec error.
		const type = CodecErrorType[error.type]

		if (type !== undefined) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return new CodecError(type, error.info as any)
		} else {
			return new Error(error.message)
		}
	}
	}
}

/**
 * Get a Commerce API for the given configuration.
 * @param params Configuration object and vendor
 * @returns Commerce API matching the configuration.
 */
// getCommerceAPI is the main client interaction point with the integration layer
export const getCommerceAPI = async (params: any = undefined): Promise<CommerceAPI> => {
	const codec = flattenConfig(params)

	//const codec = params.codec_params ?? params // merge in vendor with params
	if (isServer() || (!useMiddleware && !params.middleware_url)) {
		return await getAPI(codec)
	} else {
		const getResponse =
			(operation: CommerceOperation) =>
				async (args: any): Promise<any> => {
					const apiUrl = (window as any).isStorybook
						? 'https://core.dc-demostore.com/api'
						: (params.middleware_url ?? '/api')

					const response = (await axios.post(apiUrl, { ...args, ...codec, operation })).data

					if (response.pageInfo) {
						// Feed back pagination info into the arguments object
						Object.assign(args, response.pageInfo)
					}

					if (response.error) {
						throw fromApiError(response.error)
					}

					return response.result
				}

		return {
			getProduct: getResponse('getProduct'),
			getProducts: getResponse('getProducts'),
			getCategory: getResponse('getCategory'),
			getCategoryTree: getResponse('getCategoryTree'),
			getCustomerGroups: getResponse('getCustomerGroups'),
			getRawProducts: getResponse('getRawProducts')
		}
	}
}

const createMiddlewareResponse = (config: PaginationArgs, result: any): any => {
	const response = {
		result
	} as any

	const pageInfo = {} as PaginationArgs

	if (config.pageSize != null) pageInfo.pageSize = config.pageSize
	if (config.cursor != null) pageInfo.cursor = config.cursor
	if (config.cursorPage != null) pageInfo.cursorPage = config.cursorPage
	if (config.total != null) pageInfo.total = config.total

	if (Object.keys(pageInfo).length > 0) {
		response.pageInfo = pageInfo
	}

	return response
}

/**
 * Integration middleware request handler. Provides access to commerce api methods.
 * @param req Request object
 * @param res Response object
 * @returns Response
 */
// handler for /api route
export const middleware = async (req, res) => {
	// CORS support
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Headers', '*')
	res.setHeader('Access-Control-Allow-Methods', '*')

	if (!useMiddleware) {
		return res.status(404).send()
	}

	const config = req.body || req.query
	const commerceAPI = await getCommerceAPI(config)
	switch (req.method.toLowerCase()) {
	case 'get':
	case 'post':
		try {
			return res.status(200).json(createMiddlewareResponse(config, await commerceAPI[config.operation](config)))
		} catch (e) {
			return res.status(200).json({error: toApiError(e)})
		}

	case 'options':
		return res.status(200).send()

	default:
		break
	}
}

export default middleware
