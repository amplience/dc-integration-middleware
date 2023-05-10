import { PaginationArgs } from './types'

interface PageCacheEntry<T> {
	page: number;
	cursor?: string;
	cursorPage?: number;
	data: T[];
}

export type PaginationMethod<T> = (args: PaginationArgs) => Promise<T[]>;

/**
 * This class allows you to cache visited pages of a paginated collection.
 * It also automatically handles cursor pagination and starting from the correct offsets.
 */
export class PageCache<T> {
	private pageSize?: number
	private total?: number

	private cache: PageCacheEntry<T>[] = []

	/**
	 * Create a new page cache for a paginated collection.
	 * @param baseArgs Base arguments for the method, without pagination parameters
	 * @param method The method to call to request a page from the collection
	 * @param pageSize Page size. If not set, will be determined by the backend on first request
	 */
	constructor(private method: PaginationMethod<T>, private baseArgs: PaginationArgs, pageSize?: number) {
		this.pageSize = pageSize
	}

	/**
	 * Get a cached page using the provided method. Request the page if it has not been seen before.
	 * @param page Page number
	 * @returns The data within the page
	 */
	async getPage(page: number): Promise<T[]> {
		if (this.cache[page] != null) {
			return this.cache[page].data
		}

		const requestArgs = {...this.baseArgs}

		delete requestArgs.cursor
		delete requestArgs.cursorPage

		// Find last page to start a cursor from
		for (let i = page - 1; i >= 0; i--) {
			if (this.cache[i] != null) {
				requestArgs.cursor = this.cache[i].cursor
				requestArgs.cursorPage = this.cache[i].cursorPage
				break
			}
		}

		requestArgs.pageNum = page
		requestArgs.pageSize = this.pageSize
		requestArgs.pageCount = 1
		delete requestArgs.total

		const result = await this.method(requestArgs)

		if (this.pageSize == null) {
			this.pageSize = requestArgs.pageSize
		}

		if (requestArgs.total != null) {
			this.total = requestArgs.total
		}

		this.cache[page] = {
			page,
			cursor: requestArgs.cursor,
			cursorPage: requestArgs.cursorPage,
			data: result
		}

		return result
	}

	/**
	 * Gets the page size. This must be either defined on creation or is provided by the backend on getting any page.
	 * @returns 
	 */
	getPageSize(): number | undefined {
		return this.pageSize
	}

	/**
	 * Gets the highest page number that has been cached.
	 * @returns 
	 */
	getMaxPage(): number | undefined {
		return this.cache.length
	}

	/**
	 * Gets the total number of items, if available.
	 * On certain backends, the total number of items will only appear when you reach the last page.
	 * @returns Total number of items, or undefined if unknown.
	 */
	getTotal(): number | undefined {
		return this.total
	}
}
