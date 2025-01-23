# Scayle

## `scayleCodec`

Location: `src/codec/codecs/scayle`

Connects to a Scayle instance.

See the [CORS](../../../README.md#cors-support-table) / [Server](../../../README.md#server-support-table) support tables for more information

### Configuration

```json
{
	"vendor": "scayle",
	"codec_params": {
		"access_token": "<storefront access token>",
		"shop_id": "<storefront shop id>",
		"tenant_space": "<scayle tenant space>",
		"api_version": "<scayle api version>" // Defaults to v1
	}
}
```

## Configuration on the vendor side

The Scayle integration requires the creation of a storefront access token in order to access data.

These access tokens are per 'shop' in Scayle and can be generated using the guide [storefront api](https://scayle.dev/en/api-guides/storefront-api)

> Note: This access token is not retrievable after creation so please copy on creation and store in a secure place