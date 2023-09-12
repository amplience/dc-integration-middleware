# Host the service

To host your own version, simply fork the repo and `npm install` your own fork.

```
npm i github:<your github>/dc-integration-middleware
```

That's really it.

Or, if you're using it with our [eComm Toolkit Extension](https://github.com/amplience/dc-extension-ecomm-toolkit), update the dependency in that package.json to point to your fork.

```
"@amplience/dc-integration-middleware": "git+https://github.com/yourgithub/dc-integration-middleware.git"
```

> Note: we recommend keeping @amplience in the json key above, otherwise you'll need to update any imports referencing @amplience

If you make updates to the integration that require your own version of the Toolkit extension, you'll also need to [host that extension on your own as well](https://github.com/amplience/dc-extension-ecomm-toolkit/blob/main/README.md#host-your-own-setup).

Finally, as this is an open source project, feel free to PR any updates you make that you think would be useful to the larger community!
