# Scayle

## `scayle codec`

Connects to a Scayle instance

See the [CORS](../../../README.md#cors-support-table) / [Server](../../../README.md#server-support-table) support tables for more information

### Configuration

```json
{
	"vendor": "scayle",
	"codec_params": {
		"access_token": "<shop_access_token>",
		"shop_id": "<shop_id>",
		"tenant_space": "<tenant_space>",
		"api_version": "v1",
		"image_base_path": "",
		"api_base_url": ""
	}
}
```

## Configuration on the vendor side

The Scayle integration requires a "Storefront API Key", "Shop ID" and "Tenant Space" in order to access data.

### Storefront API `access_token`

How to generate a "Storefront API Key" (access_token) - [Scayle docs - Generate API Keys](https://scayle.dev/en/user-guide/settings/general/api-keys#generate-api-keys)

### Shop ID `shop_id`

How to get the "Shop ID" - [Scayle docs - Shop Country ID](https://scayle.dev/en/developer-guide/introduction/apis#country-identification)

### Tenant Space `tenant_space`

The "Tenant Space" can be picked from your Scayle panel URL e.g. `https://{{tenant-space}}.panel.scayle.cloud/`

## Optional configuration

### API Version `api_version`

Overrides the default api version (default = `v1`)

### Image Base Path `image_base_path`

Overrides the default image path used to create image urls

### API Base URL `api_base_url`

Overrides the default Storefront API base URL

## Scayle API integration

The integration middleware uses Scayle's [Storefront API](https://scayle.dev/en/api-guides/storefront-api) to request shop product and category data.

## How we map data

To maintain consistent response types we map data returned from Scayle APIs. The following documents what Scayle API properties get mapped to their respective integration properties.

Example product integrations response item:

```json
{
	"id": "1",
	"slug": "LIJ0480001000004",
	"name": "Liu Jo Sandale CAMELIA",
	"shortDescription": "Liu Jo Sandale CAMELIA - short description",
	"longDescription": "Liu Jo Sandale CAMELIA - long description",
	"variants": [
		{
			"id": "40",
			"images": [
				{
					"url": "https://dc-integration-middleware-test-demo.cdn.aboutyou.cloud/images/68bf124a0517bffaa5fe1dc7ac8707db.jpg"
				}
			],
			"listPrice": "€329.90",
			"salePrice": "€329.90",
			"sku": "LIJ0480001000004_38",
			"attributes": {}
		}
	],
	"categories": []
}
```

Examples category response item:

```json
{
	"id": "1",
	"name": "Männer",
	"slug": "maenner",
	"children": [],
	"products": [],
	"showInMenu": true
}
```

### Product & Product Variants mapping

We use Scayle's [Storefront API - List Products](https://scayle.dev/en/api-guides/storefront-api/resources/products/list-products) to map products:

| Integration product   | Scayle product                      | Notes                            |
| --------------------- | ----------------------------------- | -------------------------------- |
| id                    | id                                  |                                  |
| slug                  | referenceKey                        |                                  |
| name                  | attributes.name.values.label        |                                  |
| shortDescription      | attributes.description.values.label |                                  |
| longDescription       | attributes.description.values.label |                                  |
| variants              | variants                            |                                  |
| variants[].sku        | variants[].referenceKey             |                                  |
| variants[].listPrice  | variants[].price.withTax            |                                  |
| variants[].salePrice  | variants[].price.withTax            |                                  |
| variants[].images     | images[].hash                       |                                  |
| variants[].attributes | {}                                  | Not defined                      |
| categories            | categories                          | See Category mapping for details |

### Category mapping

We use Scayle's [Storefront API - List Categories](https://scayle.dev/en/api-guides/storefront-api/resources/categories/list-categories) to map categories:

| Integration category | Scayle category | Notes                                                                                |
| -------------------- | --------------- | ------------------------------------------------------------------------------------ |
| id                   | id              |                                                                                      |
| name                 | name            |                                                                                      |
| slug                 | slug            |                                                                                      |
| children             | children        |                                                                                      |
| products             | products        | The products are done as a seperate lookup using the Scayle `list-products` endpoint |
| showInMenu           | isHidden        | We invert this boolean values                                                        |
