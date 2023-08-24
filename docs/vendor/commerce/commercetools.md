# CommerceTools

## `commerceToolsCodec`
Location: `src/codec/codecs/commercetools`

Connects to a commercetools instance.

See the [CORS](../../../README.md#cors-support-table) / [Server](../../../README.md#server-support-table) support tables for more information

### Configuration

```json
{
    "vendor": "commercetools",
    "codec_params": {
        "project": "<ct project key>",
        "client_id": "<ct client id>",
        "client_secret": "<ct client secret>",
        "auth_url": "<ct auth url",
        "api_url": "<ct api url>",
        "scope": "<list of scopes>"
    }
}
```

## Configuration on the vendor side

You can create new API credentials in the `Settings > Developer settings` and then go to `Create new API client`.

![](../../media/commercetoolsA.png)

Next you can select the required scopes:

- `Categories`
- `Customer groups`
- `Products (published)`

![](../../media/commercetoolsB.png)

You can then access the credentials (one time) with all the required properties:

![](../../media/commercetoolsC.png)

> Note: This integrations uses the [Product Projection Search API HTTP API](https://docs.commercetools.com/api/projects/products-search) from CommerceTools. Please follow steps in their documentation to ensure that this is enabled (ie indexing enabled)
