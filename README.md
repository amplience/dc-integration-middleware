# @amplience/dc-integration-middleware

Amplience Integration Middleware is a service written in `Node.js` that is intended to manage a number of different types of services, including but not limited to:

-   Commerce Services

`dc-integration-middleware` uses codecs in order to determine how and where to get data from. It currently supports getting e-commerce data from:

-   Commercetools
-   BigCommerce
-   Shopify
-   Salesforce Commerce Cloud
-   REST

## 📝 Pre-requisites

This extension was developed and tested with:

-   Node version `16.x`
-   NPM version `8.x`

## ⚙️ Features

The `CommerceAPI` interface exposes these methods:

-   `getProduct` (by ID or slug)
-   `getProducts` (by IDs, keyword, or category ID)
-   `getCategory` (by ID)
-   `getCategoryTree` (category structure)
-   `getCustomerGroups` (customer segmentation)
  - Customer Groups are not supported when accessing some integrations from a browser.

### CORS Support Table
|  |	SFCC | Big Commerce (CORS) | Commercetools | Shopify | REST |
| :--- | :---: | :---: | :---: | :---: | :---: |
| products | ✅ | ✅  | ✅  | ✅  | ✅  |
| categories | ✅  | ✅  | ✅  | ✅  | ✅  |
| user segments | ✅  | ❌ | ✅  | ❌ | ✅  |

Concrete implementations of this interface are referred to as `Codec`s and are located in `src/codec/codecs`. Platform-specific e-Commerce implementations are found in `src/codec/codecs/commerce`.
You can find types and methods [here](./docs/dev/commerce-codec.md).

There is a separate project called [`dc-integration-tester`](https://github.com/amplience/dc-integration-tester) which provides a CLI that lets you test the codecs in this project with your configuration, and potentially test new or modified codecs on your own copy of the codebase.

There are also [Unit Tests](./docs/dev/unit-testing.md) for each method and vendor.

### Server Support Table
If you choose to deploy your use of this middleware in your own hosting, you can change the configuration to interface with commerce API's from the server rather than client side. See [`import`](./docs/dev/import.md)

|  |	SFCC | Big Commerce | Commercetools | Shopify | REST |
| :--- | :---: | :---: | :---: | :---: | :---: |
| products | ✅ | ✅  | ✅  | ✅  | ✅  |
| categories | ✅  | ✅  | ✅  | ✅  | ✅  |
| user segments | ✅  | ✅  | ✅  | ✅  | ✅  |

## 🏁 Quick Start


> Note: as an example you can check our [eComm Toolkit extension](https://github.com/amplience/dc-extension-ecomm-toolkit) that is built using `dc-integration-middleware` as a middleware in `Next.js`.

Using the `config` object for one of the commerce vendors, you can get the Commerce API:

```typescript
const commerceApi = await getCommerceAPI(config)
```

(NOTE: You should get a new Commerce API whenever you want to use different credentials or a different locale/language)

From there you can use any of the commerce methods:

```typescript
// Getting the category tree
const categoryTree: Category[] = await commerceApi.getCategoryTree({})

// Getting customer groups
const customerGroups: CustomerGroup[] = await commerceApi.getCustomerGroups({})

// Getting products by ids
const products: Product[] = await commerceApi.getProducts({
    productIds: ids
})

// Getting products by keyword
const products: Product[] = await commerceApi.getProducts({
    keyword: keywordInput.current.value
})

// Getting a category by slug
const category: Category = await commerceApi.getCategory({
    slug: catSlug
})

// Getting a product by id
const product: Product = await commerceApi.getProduct({
    id: productId
})
```

## 📐 Architecture Diagram

![](./docs/media/architecture.png)

## 🏢 Vendor specific information

- **Commerce Services**
  - [Saleforce Commerce Cloud](./docs/vendor/commerce/sfcc.md)
  - [Shopify](./docs/vendor/commerce/shopify.md)
  - [BigCommerce](./docs/vendor/commerce/bigcommerce.md)
  - [BigCommerce CORS](./docs/vendor/commerce/bigcommerce-cors.md)
  - [CommerceTools](./docs/vendor/commerce/commercetools.md)
  - [REST](./docs/vendor/commerce/rest.md)

## 🧩 Development

- **Types and methods**
  - [Commerce Codecs](./docs/dev/commerce-codec.md)
  - [Pagination](./docs/dev/pagination.md)
  - [Page Cache](./docs/dev/page-cache.md)
- **Project**
  - [Import into project](./docs/dev/import.md)
  - [Host the service](./docs/dev/host.md)
  - [Develop locally](./docs/dev/develop-locally.md)
- **Integration**
  - [Modify an integration](./docs/dev/modify-integration.md)
  - [Add an integration](./docs/dev/add-integration.md)
- **Testing**
  - [Unit testing guidelines](./docs/dev/unit-testing.md)
- **Support**
  - [Support Guidelines](./docs/support.md)

## 📄 License

This software is licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0),

Copyright 2023 Amplience

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

```
http://www.apache.org/licenses/LICENSE-2.0
```

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
