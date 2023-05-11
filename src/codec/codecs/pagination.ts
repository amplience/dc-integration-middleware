import { OAuthRestClientInterface, PaginationArgs } from '@/common'
import { AxiosRequestConfig, AxiosStatic } from 'axios'
import { logResponse } from './common'

export type GetPageResultCursor<T> = { data: T[], hasNext: boolean, nextCursor?: string, total?: number }

type GetPageResult<T> = { data: T[], total: number }
type PropMapper = <T>(data: any) => T
type StringPropMapper = string | PropMapper

/**
 * Get an URL with added params from the given object.
 * @param url The original URL
 * @param params The params to append to the URL
 * @returns The URL with the added params
 */
function applyParams(url: string, params: any): string {
	const isRelative = url.startsWith('/')

	if (isRelative) {
		// TODO: better solution?
		url = 'http://a'+ url
	}

	const urlObj = new URL(url)

	for (const key of Object.keys(params)) {
		urlObj.searchParams.append(key, params[key])
	}

	url = urlObj.toString()

	if (isRelative) {
		url = url.substring(8)
	}

	return url
}

/**
 * Return a method that maps from an object to a property within it defined by the given string, if a custom one is not provided.
 * @param mapper Mapping string or method
 * @returns Mapping method
 */
function getPropMapper(mapper: StringPropMapper): PropMapper {
	if (typeof mapper === 'string') {
		return <T>(data: any) => data[mapper] as T
	}

	return mapper
}

/**
 * Return a generator for a function that gets a page from an oauth endpoint with query parameters.
 * @param offsetQuery Query key to use for item offset
 * @param countQuery Query key to use for page size
 * @param totalProp Property to extract total assets from
 * @param resultProp Property to extract result items from
 * @returns A generator that takes a client, url and base params and generates a function that gets a page.
 */
export function getPageByQuery(offsetQuery: string, countQuery: string, totalProp: StringPropMapper, resultProp: StringPropMapper) {
	const totalPropMap = getPropMapper(totalProp)
	const resultPropMap = getPropMapper(resultProp)

	return <T>(client: OAuthRestClientInterface, url: string, params: any = {}) => 
		async (page: number, pageSize: number): Promise<GetPageResult<T>> => {
			const allParams = {
				...params,
				[offsetQuery]: page * pageSize,
				[countQuery]: pageSize
			}

			const newUrl = applyParams(url, allParams)

			const response = await client.get({url: newUrl})

			logResponse('get', newUrl, response)

			if (response == null) {
				return {
					data: [],
					total: 0
				}
			}

			return {
				data: resultPropMap(response),
				total: totalPropMap(response)
			}
		}
}

/**
 * Return a generator for a function that gets a page using an axios client with query parameters.
 * @param offsetQuery Query key to use for item offset
 * @param countQuery Query key to use for page size
 * @param totalProp Property to extract total assets from
 * @param resultProp Property to extract result items from
 * @param offsetFunc Function for getting the offset from the page number and size
 * @returns A generator that takes a client, url and base params and generates a function that gets a page.
 */
export function getPageByQueryAxios(offsetQuery: string, countQuery: string, totalProp: StringPropMapper, resultProp: StringPropMapper, offsetFunc?: (page: number, pageSize: number) => number) {
	const totalPropMap = getPropMapper(totalProp)
	const resultPropMap = getPropMapper(resultProp)

	return <T>(axios: AxiosStatic, url: string, config: AxiosRequestConfig<any>, params: any = {}) => 
		async (page: number, pageSize: number): Promise<GetPageResult<T>> => {
			const allParams = {
				...params,
				[offsetQuery]: offsetFunc ? offsetFunc(page, pageSize) : page * pageSize,
				[countQuery]: pageSize
			}

			const newUrl = applyParams(url, allParams)

			const response = await axios.get(newUrl, config)

			logResponse('get', newUrl, response.data)

			return {
				data: resultPropMap(response.data),
				total: totalPropMap(response.data)
			}
		}
}

/**
 * Iterate through fetching pages and build an array out of the results.
 * @param requestPage Method to use to request pages. Takes page number and size. Must return at least one page-size worth of items if the total allows it.
 * @param args Pagination arguments, new cursor and offset is written back into the object.
 * @returns List of items fetched from the paginated endpoint
 */
export async function paginateArgs<T>(
	requestPage: (page: number, pageSize: number) => Promise<GetPageResult<T>>,
	args: PaginationArgs,
	defaultPageSize = 20
): Promise<T[]> {
	const pageSize = Number(args.pageSize ?? defaultPageSize)
	const pageNum = Number(args.pageNum ?? 0)
	const pageCount = args.pageCount == null ? args.pageCount : Number(args.pageCount)

	const {result, total} = await paginate(
		requestPage,
		pageSize,
		pageNum,
		pageCount
	)

	args.pageSize = pageSize
	args.pageNum = pageNum
	args.pageCount = pageCount
	args.total = total

	return result
}

/**
 * Iterate through fetching pages and build an array out of the results.
 * @param requestPage Method to use to request pages. Takes page number and size. Must return at least one page-size worth of items if the total allows it.
 * @param pageSize Page size (default: 20)
 * @param pageNum Page number to start at (default: 0)
 * @param pageCount Number of pages to fetch (default: all)
 * @returns List of items fetched from the paginated endpoint
 */
export const paginate = async <T>(
	requestPage: (page: number, pageSize: number) => Promise<GetPageResult<T>>,
	pageSize = 20,
	pageNum = 0,
	pageCount?: number
): Promise<{result: T[], total: number}> => {
	const result: T[] = []

	if (pageCount === undefined) {
		pageCount = Infinity
	}

	const startOffset = pageNum * pageSize
	const targetCount = pageCount * pageSize

	let finalTotal = 0

	for (let i = 0; i < pageCount; i++) {
		const {data, total} = await requestPage(pageNum + i, pageSize)
		finalTotal = total
		
		// There's a possibility that the implementation has returned more than one page.
		// Allow multiple pages to be completed at a time.
		let pagesReturned: number
		try {
			pagesReturned = Math.floor(data.length / pageSize)
		} catch (e) {
			throw new Error(`${pageNum} ${i} ${pageSize}`)
		}

		let dataCount = data.length

		if (pagesReturned > 0) {
			dataCount = pagesReturned * pageSize
			i += pagesReturned - 1
		}

		const targetMin = Math.min(total - startOffset, targetCount)
		const end = targetMin - result.length
		const toAdd = Math.min(dataCount, end)

		result.push(...(data.slice(0, toAdd)))

		if (result.length === targetMin) {
			break
		}
	}

	return { result, total: finalTotal }
}

/**
 * Iterate through fetching pages and build an array out of the results.
 * @param requestPage Method to use to request pages. Takes cursor and page size.
 * @param pageSize Page size (default: 20)
 * @param cursor Start cursor (default: null)
 * @param pageCount Number of pages to fetch (default: all)
 * @returns List of items fetched from the paginated endpoint
 */
export async function paginateCursorArgs<T>(
	requestPage: (cursor: string, pageSize: number) => Promise<GetPageResultCursor<T>>,
	args: PaginationArgs,
	defaultPageSize = 20
): Promise<GetPageResultCursor<T>> {
	const pageSize = Number(args.pageSize ?? defaultPageSize)
	const pageNum = Number(args.pageNum ?? 0)
	const argsPageCount = args.pageCount == null ? args.pageCount : Number(args.pageCount)

	// Find the quickest way to get to the desired offset.

	if (args.cursor === undefined || args.cursorPage === undefined || Number(args.cursorPage) > pageNum) {
		// If the cursor is from a previous page, we have to start from the beginning.
		args.cursor = undefined
		args.cursorPage = undefined
	}

	const cursor = args.cursor
	const cursorPage = Number(args.cursorPage ?? 0)

	// We might need to get additional pages to catch up to the requested page.
	const fetchedExtra = cursorPage < pageNum
	const pageCount = argsPageCount == null ? null : (fetchedExtra ? (pageNum - cursorPage) + argsPageCount : argsPageCount)

	const resultCursor = await paginateCursor(requestPage, pageSize, cursor, pageCount)

	if (fetchedExtra) {
		resultCursor.data = resultCursor.data.slice((pageNum - cursorPage) * pageSize)
	}

	args.total = resultCursor.total ?? (resultCursor.hasNext ? undefined : (pageNum * pageSize + resultCursor.data.length))
	args.pageSize = pageSize
	args.cursor = resultCursor.nextCursor
	args.cursorPage = (argsPageCount != null) ? pageNum + argsPageCount : undefined

	return resultCursor
}

/**
 * Iterate through fetching pages and build an array out of the results.
 * @param requestPage Method to use to request pages. Takes cursor and page size.
 * @param pageSize Page size (default: 20)
 * @param cursor Start cursor (default: null)
 * @param pageCount Number of pages to fetch (default: all)
 * @returns List of items fetched from the paginated endpoint
 */
export const paginateCursor = async <T>(
	requestPage: (cursor: string, pageSize: number) => Promise<GetPageResultCursor<T>>,
	pageSize = 20,
	cursor?: string,
	pageCount?: number
): Promise<GetPageResultCursor<T>> => {
	const result: T[] = []

	if (pageCount == null) {
		pageCount = Infinity
	}

	const targetCount = pageCount * pageSize

	let finalTotal: number | undefined = undefined

	for (let i = 0; i < pageCount; i++) {
		const {data, hasNext, nextCursor, total} = await requestPage(cursor, pageSize)
		finalTotal = total

		const dataCount = data.length

		const end = targetCount - result.length
		const toAdd = Math.min(dataCount, end)

		result.push(...(data.slice(0, toAdd)))

		cursor = nextCursor

		if (!hasNext) {
			return {
				data: result,
				hasNext: false,
				nextCursor: cursor,
				total
			}
		}
		else if (result.length === targetCount)
		{
			break
		}
	}

	return {
		data: result,
		hasNext: true,
		nextCursor: cursor,
		total: finalTotal
	}
}

/**
 * Generate a method to paginate through a list of resources with the given arguments.
 * @param items List of items to paginate
 * @returns A method to paginate through a list of resources
 */
export function getListPage<T>(list: T[]) {
	return async (pageNum: number, pageSize: number): Promise<GetPageResult<T>> => {
		if (pageNum < 0 || pageNum * pageSize > list.length) {
			return {
				data: [],
				total: list.length
			}
		}

		return {
			data: list.slice(pageNum * pageSize, (pageNum + 1) * pageSize),
			total: list.length
		}
	}
}

/**
 * Handle pagination as if the result list were empty.
 * @param args Pagination arguments, new cursor and offset is written back into the object.
 * @returns Empty list
 */
export function paginateBlankArgs<T>(args: PaginationArgs): T[] {
	args.pageSize = Number(args.pageSize ?? 0)
	args.pageNum = Number(args.pageNum ?? 0)
	args.pageCount = args.pageCount == null ? args.pageCount : Number(args.pageCount)

	args.total = 0
	delete args.cursor
	delete args.cursorPage

	return []
}