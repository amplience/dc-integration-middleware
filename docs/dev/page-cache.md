# Page Cache
When implementing this middleware into an application (either on your own frontend or via an [Amplience Extension](https://amplience.com/developers/docs/integrations/extensions/)), we would recommend taking advantage of the included page cache class so that you do not have to reload data that is already fetched, and to avoid complicated logic when paginating through cursor based APIs.

Location: `src/common/page-cache.ts`

Advantages:
 - Faster load time for repeated requests
 - Easy re-usable implementation for caching 'paged' responses from both index and cursor based APIs

## Methods

|Method|Meaning|Notes|
|:----|:----|:----|
|getPage|Get a cached page using the provided method. Request the page if it has not been seen before.|-|
|getPageSize|Gets the page size. This must be either defined on creation or is provided by the backend on getting any page.|-|
|getMaxPage|Gets the highest page number that has been cached| |
|getTotal|Gets the total number of items, if available.|On certain backends, the total number of items will only appear when you reach the last page.|


## Example usage (eComm Toolkit)
Page Cache is used in the [eComm Toolkit Extension](https://github.com/amplience/dc-extension-ecomm-toolkit). For specifics, please see the [Product Selector Component](https://github.com/amplience/dc-extension-ecomm-toolkit/tree/main/components/ProductSelector/index.tsx)

Example import and getting products by keyword into cache:
```javascript
import { PageCache } from '@amplience/dc-integration-middleware'

const cache = new PageCache(ampSDK.commerceApi.getProducts, {
    keyword: keywordInput.current.value
} as any, itemsPerPage)
```