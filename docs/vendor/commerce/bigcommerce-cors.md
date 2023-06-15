# BigCommerce CORS

## `bigCommerceCodec`
Location: `src/codec/codecs/bigcommerce-cors`

Connects to a BigCommerce instance via the GraphQL Storefront API. This backend does not support listing customer groups.

### Configuration

```json
{
    "vendor": "bigcommerce-cors",
    "codec_params": {
        "site_id": "<bigcommerce site id>",
        "api_token": "<bigcommerce graphql storefront api token>",
    }
}
```

## Configuration on the vendor side

### Create Store-level API account

TODO

### Get API credentials