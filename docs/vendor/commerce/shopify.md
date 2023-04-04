# Shopify

## `shopifyCodec`

Location: `src/codec/codecs/shopify`

Connects to a Shopify instance.

### Configuration

```json
{
	"vendor": "shopify",
	"codec_params": {
		"access_token": "<storefront access token>",
		"admin_access_token": "<admin access token>",
		"version": "<api version, eg. 2023-01>",
		"site_id": "<shopify site id>"
	}
}
```

## Configuration on the vendor side

The Shopify integration requires both a storefront and an admin token, therefore you'll need to enable custom app development on your store, create a custom app **_and_** install the app in the store to generate those tokens.

> Note: Currently there is no _Amplience specific_ Shopify app so you will need to use another app to gain access to the credentials and

The steps are as follows:

### Enable Custom Apps

In the Settings for your store, click "Apps and sales channels", then click "Develop Apps" (highlighted below)

![](../../media/shopifyEnableDevApp.png)

On the next screen, click "Allow custom app development".

![](../../media/shopifyEnableDevApp2.png)

Finally, click "Allow custom app development" in that last screen.

![](../../media/shopifyEnableDevApp3.png)

### Create a custom app

Once you've done that, you'll be back on the "Apps and sales channels" settings page. Go ahead and click on "Create an app".

![](../../media/shopifyA.png)

Give your app a name and assign an App developer.

![](../../media/shopifyB.png)

Now that your app has been created, you need to configure BOTH Admin & Storefront API Scopes.

![](../../media/shopifyC.png)

In each of those pages, select the scopes you want access to in each API. Our required scopes are:

#### Admin API Scopes

-   `read_customers`

#### Storefront API Scopes

-   `unauthenticated_read_product_listings`

If you [modify](../dev/modify-integration.md) or [add](../dev/add-integration.md) to any of the shopify methods already provided, you may need to select additional scopes.

![](../../media/shopifyD.png)

> Note! The Webhook version highlighted in the Admin API integration screenshot is the `version` for your codec config at the top the page.

### Get access tokens

At this point, if you go to the API Credentials Tab, you'll see that you already have an API key and secret, however we really need to use access tokens, so you'll need to install the app.

![](../../media/shopifyF.png)

> Note the site/store where you're installing your app (highlighted in the screenshot, yours will be different), that's your `site_id`.

![](../../media/shopifyG.png)

Once you've installed the App, you'll see your Admin and Storefront Access Tokens! Use these in your integration configuration.

![](../../media/shopifyH.png)
