/**
 * GraphQL error.
 */
export interface GqlError {
	message: string
}

/**
 * GraphQL response.
 */
export interface GqlResponse<T> {
	data: T
	errors?: GqlError[]
}

/**
 * GraphQL edge from a paginated request.
 */
export interface Edge<T> {
	node: T,
	cursor: string
}

/**
 * GraphQL pagination info.
 */
export interface PageInfo {
	hasNextPage: boolean,
	endCursor: string
}

/**
 * GraphQL collection info.
 */
export interface CollectionInfo {
	totalItems: number
}

/**
 * GraphQL paginated request with edges.
 */
export interface Paginated<T> {
	edges: Edge<T>[],
	pageInfo: PageInfo,
	collectionInfo?: CollectionInfo
}

/**
 * Converts GraphQL errors to CodecError info.
 * @param errors GraphQL errors
 * @returns CodecError info
 */
export function fromGqlErrors(errors: GqlError[]) {
	const message = errors.map(error => error.message).join(', ')

	return {
		message,
		errors
	}
}
