# Importing into a project

To use the integration in an existing project, you can refer to how we're using it in our [eComm Toolkit Extension](https://github.com/amplience/dc-extension-ecomm-toolkit), but the basic steps are as follows.

## Import the npm package

```
$ npm i @amplience/dc-integration-middleware
```

## Export middleware and init

The Middleware API is a way to provide access to CORS-limited API methods from a browser. It's not recommended to use this, but the option is there for users who need the functionality.

When using something like Next.js, or a similar route-based framework, this should be in `/pages/api/index.js`. This will essentially add the `/api` route to your project. Whether this route functions depends on if the `INTEGRATION_MIDDLEWARE_SERVER` environment variable is true, though it can also be changed via the `enableMiddleware` method.

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

## Init and use

Then import the init function and init using a [vendor-specific codec](../../README.md#vendor-specific-information)

```javascript
import { initCommerceApi } from '../pages/api'

let commerceApi = await initCommerceApi(vendorSpecificParams)

const tree = await commerceApi.getCategoryTree({})
const groups = await commerceApi.getCustomerGroups({})
```
