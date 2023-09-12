# Importing into a project

To use the integration in an existing project, you can refer to how we're using it in our [eComm Toolkit Extension](https://github.com/amplience/dc-extension-ecomm-toolkit), but the basic steps are as follows.

## Import the npm package

```
$ npm i github:amplience/dc-integration-middleware
```

You can specify a specific version with #.

## Export middleware and init

The Middleware API is a way to provide access to CORS-limited API methods from a browser. It's not recommended to use this, but the option is there for users who need the functionality.

When using something like Next.js, or a similar route-based framework, this should be in `/pages/api/index.js`. This will essentially add the `/api` route to your project. Whether this route functions depends on if the `INTEGRATION_MIDDLEWARE_SERVER` environment variable is true, though it can also be changed via the `enableMiddleware` method.

By default, clientside uses of the project will not try to contact the middleware API either. If `INTEGRATION_MIDDLEWARE_SERVER` is defined and true _at build time_, the middleware api is assumed to be present at `/api` and will be used. This can be controlled via the `enableMiddleware` method in a similar way. Regardless of any settings, requests can use middleware APIs by providing the property `middleware_url` in the method params.

You should also export an init function.

```javascript
import {
	middleware,
	CommerceAPI,
	getCommerceAPI as integrationGetCommerceAPI
} from '@amplience/dc-integration-middleware'

// add the /api route
export default middleware

let configuredApi: CommerceAPI
const initCommerceApi = async (config: any) => {
	return (configuredApi = configuredApi || (await integrationGetCommerceAPI(config)))
}

export { initCommerceApi }
```

`enableMiddleware` can be used as follows:
```typescript
import {
	enableMiddleware
} from '@amplience/dc-integration-middleware'

enableMiddleware(true); // Enables hosting/default access via the middleware API.
```

## Init and use

Then import the init function and init using a [vendor-specific codec](../../README.md#vendor-specific-information)

```javascript
import { initCommerceApi } from '../pages/api'

let commerceApi = await initCommerceApi(vendorSpecificParams)

const tree = await commerceApi.getCategoryTree({})
const groups = await commerceApi.getCustomerGroups({})
```
