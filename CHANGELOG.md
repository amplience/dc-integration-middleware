# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.1.0](https://github.com/amplience/dc-integration-middleware/compare/v2.0.1...v2.1.0) (2023-08-28)


### Bug Fixes

* **commercetools:** fix category tree, respect language for category list, select first available language ([#6](https://github.com/amplience/dc-integration-middleware/issues/6)) ([da524b4](https://github.com/amplience/dc-integration-middleware/commit/da524b45338db1973a6bb8704540227dfdc42b98))

### [2.0.1](https://github.com/amplience/dc-integration-middleware/compare/v2.0.0...v2.0.1) (2023-06-30)


### Bug Fixes

* fix CORS OPTIONS request for middleware api ([#4](https://github.com/amplience/dc-integration-middleware/issues/4)) ([2b1facf](https://github.com/amplience/dc-integration-middleware/commit/2b1facf93d71fd6034d5199d4188c3a83bf5a44b))

## [2.0.0](https://github.com/amplience/dc-integration-middleware/compare/v1.1.0...v2.0.0) (2023-06-30)


### ⚠ BREAKING CHANGES

* prefer cors requests and add bigcommerce-cors backend (#3)

### Features

* prefer cors requests and add bigcommerce-cors backend ([#3](https://github.com/amplience/dc-integration-middleware/issues/3)) ([767c0d9](https://github.com/amplience/dc-integration-middleware/commit/767c0d9873b8c7447044b941c841b4fba09e6266))

## [1.1.0](https://github.com/amplience/dc-integration-middleware/compare/v1.0.0...v1.1.0) (2023-05-12)


### Features

* WIP pagination ([d5f4541](https://github.com/amplience/dc-integration-middleware/commit/d5f4541638dc52834e2c8106774c0d017cb9d58e))


### Bug Fixes

* [NOVAFEED-106] SFCC - If images are missing and using the standard link as a fallback ([db0f843](https://github.com/amplience/dc-integration-middleware/commit/db0f8432c25f59832fcf2ddb268a80d35f805c57))
* [Shopify] - For some 'demo' catalogues, products do not have a SKU. In this case this falls back to the product id. ([588ef2a](https://github.com/amplience/dc-integration-middleware/commit/588ef2ae7c2edae6b846f76f109e12058361be64))
* fix cursor pagination ([db54d46](https://github.com/amplience/dc-integration-middleware/commit/db54d46af9e0ab03fa522878f0133dc422e2e7df))
* fix issues with various codecs, codec cache ([428ef61](https://github.com/amplience/dc-integration-middleware/commit/428ef615cf494af5f0d22b3ceb3bb5310731a37c))
* **shopify:** api error when no variant image is present ([32122e6](https://github.com/amplience/dc-integration-middleware/commit/32122e6a9f612679ad08cc5aff56473fbd7338ae))
