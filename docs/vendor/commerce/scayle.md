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
		"image_base_path": ""
	}
}
```

## Configuration on the vendor side

The Scayle integration requires a "Storefront API Key", "Shop ID" and "Tenant Space" in order to access data.

### Storefront API

How to generate a "Storefront API Key" - [Scayle docs - Generate API Keys](https://scayle.dev/en/user-guide/settings/general/api-keys#generate-api-keys)

### Shop ID

How to get the "Shop ID" - [Scayle docs - Shop Country ID](https://scayle.dev/en/developer-guide/introduction/apis#country-identification)

### Tenant Space

The "Tenant Space" can be picked from your Scayle panel URL e.g. `https://{{tenant-space}}.panel.scayle.cloud/`

## Sacyle API integration

The integration middleware uses Scayle's [Storefront API](https://scayle.dev/en/api-guides/storefront-api) to request shop product and category data.

To retrieve product data the integration utilises [Storefront API - List Products](https://scayle.dev/en/api-guides/storefront-api/resources/products/list-products).

For category data the integration uses [Storefront API - List Categories](https://scayle.dev/en/api-guides/storefront-api/resources/categories/list-categories)
