# Using Pagination

As this project deals with multiple API sources (Rest, GraphQL etc) from different vendors there is a Pagination Class which can be used to have consistency between the API implementations to a front end.

See [Pagination](./../../src/codec/codecs/pagination.ts) for code.

## Where is Pagination used?

The Pagination arguments are present in the following methods:

- `getProducts(keyword)`
- `getProducts(category)`

### Parameters for method supporting Pagination

```
pageNum?: number
cursor?: string
cursorPage?: number
pageSize?: number
pageCount?: number

total?: number (only returned)
```

|Param|Meaning|Notes|
|:----|:----|:----|
|pageNum|the index of the page to fetch (0 based)|If the `pageNum` is `undefined`, it will be 0.|
|pageSize|the size of each page|If `pageSize` is `undefined`, it will select a default value.|
|pageCount|the number of pages to fetch (starting at `pageNum`)|If `pageCount` is `undefined`, all items will be fetched.|
|cursor|the cursor string of the closet previously known page.|Used to speed up pagination on cursor based APIs. If the `cursor` is `undefined`, the desired page number will still be fetched but this `cursor` will be used to fetch it faster.|
|cursorPage|the page that he cursor string corresponds to.|If it is less than or equal to the requested page, time can be saved fetching the page with the `cursor`, rather than having to iterate the list up to the requested point. If the `cursorPage` is `undefined`, cursor cannot be used and will be treated as undefined.|
|total|the total number of pages.| This cannot be set and is returned if available as a number|

### Usage
Paginated methods return updated information about the page in the arguments object that was originally provided. For example, cursor and cursorPage will be updated to match the 'after' cursor for the next page when making a cursor pagination request. When the total number of items is known, it is returned in total, otherwise it is left undefined. When an undefined pageCount is provided, the backend should return the pageCount it decided to use.

## Helper Methods
Backends *_must_* implement pagination on these methods in the way described above. Fortunately, there are helper methods to let you do pagination with proper arguments writeback in [pagination.ts](./../../src/codec/codecs/pagination.ts).

|Method|Meaning|Usage|Notes|
|:----|:----|:----|:----|
|paginateArgs|paginate a normal endpoint using arguments from a codec method|Provide a `getPage` method that gets a page by `pageNum` and `pageSize`.|-|
|paginateCursorArgs|paginate an endpoint that uses cursors using arguments from a codec method|Provide a `getPage` method that gets a page by `cursor` and `pageSize`|This method may request additional pages if the start `cursor` isn't equal to the current page.|
|getListPage|generate a `getPage` method for a full list of items. |useful if pagination is not supported by the backend|See the [REST codec](../../src/codec/codecs/commerce/rest/index.ts) example for use|
|paginateBlankArgs|properly handle pagination arguments for cases where there is always no result data| | |


## Examples

### paginateArgs()

```javascript
await paginateArgs(exampleMethod, args, 123)
```

Example response:
```javascript
{
    pageCount: 2,
    pageNum: 1,
    pageSize: 20,
    total: 23
}
```

### paginateCursorArgs()
Example request:
```javascript
await paginateCursorArgs(exampleCursorMethod, args, 123)
```

Example response:
```javascript
{
    cursor: nextPage,
    cursorPage: 3,
    pageCount: 2,
    pageNum: 1,
    pageSize: 3,
    total: 12,
}
```

### getListPage()
Example request:
```javascript
getListPage([1, 2, 3, 4, 5, 6, 7, 8, 9])(1, 3))
```

Example response:
```javascript
{ 
    data: [4, 5, 6], 
    total: 9 
}
```

### paginateBlankArgs()
Example request:
```javascript
paginateBlankArgs(args)
```

Example response:
```javascript
{
    pageNum: 0,
    pageSize: 20,
    total: 0
}
```



