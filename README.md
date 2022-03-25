# @amplience/dc-demostore-integration

Amplience Demo Store Integration is a service written in Node.js that is intended to manage a number of different types of services, including but not limited to:

* commerce services (get catalog, get products)
* cms services

dc-demostore-integration uses codecs in order to determine how and where to get data from. The codecs required are configured in Amplience Dynamic Content as "Content" and not "Code".

## Codecs in use

### Rest Codec
Located in `codec/codecs/rest.ts`.

This codec loads a series of JSON objects to mimic a commerce API. These JSON objects are preloaded and then stored with interfaces to:
* getProduct
* getProducts
* getCategory

#### Products

Format: An array of products

Example: [products.json](https://demostore-catalog.s3.us-east-2.amazonaws.com/products.json)

#### Categories

Format: Category Hierarchy

Example: [categories.json](https://demostore-catalog.s3.us-east-2.amazonaws.com/categories.json)

#### Translations

Format: Key values for textual translations

Example: [translations.json](https://demostore-catalog.s3.us-east-2.amazonaws.com/translations.json) 
