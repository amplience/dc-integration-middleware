# BigCommerce

## `bigCommerceCodec`
Location: `src/codec/codecs/bigcommerce`

Connects to a BigCommerce instance via the V3 REST API. This backend is not usable under CORS restrictions (on a browser), but does support all commerce methods. See [BigCommerce CORS](./bigcommerce-cors.md) for a backend that supports CORS.

See the [CORS](../../../README.md#cors-support-table) / [Server](../../../README.md#server-support-table) support tables for more information

### Configuration

```json
{
    "vendor": "bigcommerce",
    "codec_params": {
        "api_url": "<bigcommerce api url>",
        "api_token": "<bigcommerce api token>",
        "store_hash": "<bigcommerce store hash>"
    }
}
```

## Configuration on the vendor side

### Create Store-level API account

Go to `Settings > Store-level API Tokens` and create API Account.

![](../../media/bigcommerceA.png)

Select the account type V3 API token.
You can capture the store hash that is part of the API path: `https://api.bigcommerce.com/stores/<store hash>/v3/`

![](../../media/bigcommerceB.png)

Select the required scopes:
- `Products`
- `Customers`

![](../../media/bigcommerceC.png)

### Get API credentials

Your credentials can now be accessed (one time), you will need the API URL (`https://api.bigcommerce.com`), the API token and the store hash captured previously.

![](../../media/bigcommerceD.png)