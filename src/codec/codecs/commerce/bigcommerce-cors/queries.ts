import { Paginated } from '../../../../common/graphql'
import { BigCommerceCorsCategoryTreeItem, BigCommerceCorsProduct } from './types'

export interface BigCommerceCategoryTreeResponse {
  site: {
    categoryTree: BigCommerceCorsCategoryTreeItem[]
  }
}

export interface BigCommerceProductQueryResponse {
  site: {
    search: {
      searchProducts: {
        products: Paginated<BigCommerceCorsProduct>
      }
    }
  }
}

export interface BigCommerceProductIdsResponse {
  site: {
    products: Paginated<BigCommerceCorsProduct>
  }
}

export interface BigCommerceProductCategoryResponse {
  site: {
    category: {
      entityId: number,
      products: Paginated<BigCommerceCorsProduct>
    }
  }
}

export const categories = `
query CategoryTree4LevelsDeep {
  site {
    categoryTree {
      ...CategoryFields
      children {
        ...CategoryFields
        children {
          ...CategoryFields
          children {
            ...CategoryFields
          }
        }
      }
    }
  }
}

fragment CategoryFields on CategoryTreeItem {
  name
  path
  entityId
  description
  image {
    altText
    isDefault
    urlOriginal
    
  }
  productCount
}
`

export const productShared = `
          addToCartUrl
          addToWishlistUrl
          availabilityV2 {
           status
           description
          }
          brand {
           entityId
          }
          categories {
            pageInfo {
             ...MinPageInfo
            }
            edges {
              node {
                 description
                entityId
                name
                path
              }
              cursor
            }
          }
          condition
          createdAt {
            utc
          }
          defaultImage {
            ...MinImage
          }
          depth {
           ...Measurement
          }
          description
          entityId
          giftWrappingOptions(first: 50) {
            pageInfo { ...MinPageInfo }
            edges {
              node {
                allowComments
                entityId
                name
                previewImageUrl
              }
              cursor
            }
          }
          gtin
          height { ...Measurement }
          id
          images(first: 50) {
            pageInfo { ...MinPageInfo }
            edges {
              node {
                ...MinImage
              }
              cursor
            }
          }
          inventory {
            aggregated {
              availableToSell
              warningLevel
            }
            hasVariantInventory
            isInStock
          }
          maxPurchaseQuantity
          minPurchaseQuantity
         mpn
         name
         path
         plainTextDescription
         prices(currencyCode: $currencyCode, includeTax: true) {
           ...Prices
         }
         reviewSummary {
           averageRating
           numberOfReviews
           summationOfRatings
         }
         seo {
           metaDescription
           metaKeywords
           pageTitle
         }
         showCartAction
         sku
         type
         upc
         variants(first: 100) {
           pageInfo { ...MinPageInfo }
           edges {
             node {
               defaultImage {
                 ...MinImage
               }
               depth { ...Measurement }
               entityId
               gtin
               height { ...Measurement }
               id
               inventory {
                 aggregated {
                   availableToSell
                   warningLevel
                 }
                 isInStock
               }
               isPurchasable
               mpn
               options(first: 50) {
                 pageInfo { ...MinPageInfo }
                 edges {
                   node {
                     displayName
                     entityId
                     isRequired
                     values(first: 50) {
                       pageInfo { ...MinPageInfo }
                       edges {
                         node {
                           entityId
                           label
                         }
                         cursor
                       }
                     }
                   }
                   cursor
                 }
               }
               prices { ...Prices }
               sku
               upc
               weight { ...Measurement }
               width { ...Measurement }
             }
             cursor
           }
         }
         warranty
         weight { ...Measurement }
         width { ...Measurement }
`

const sharedProductFragments = `
fragment MinPageInfo on PageInfo {
  hasNextPage
  endCursor
}

fragment MinImage on Image {
  altText
  isDefault
  urlOriginal
}

fragment Measurement on Measurement {
  unit
  value
}

fragment Money on Money {
  currencyCode
  value
}

fragment MoneyRange on MoneyRange {
  max { ...Money }
  min { ...Money }
}

fragment Prices on Prices {
  basePrice { ...Money }
  mapPrice { ...Money }
  price { ...Money }
  priceRange { ...MoneyRange }
  retailPrice { ...Money }
  retailPriceRange { ...MoneyRange }
  salePrice { ...Money }
  saved { ...Money }
}
`

/**
 * GraphQL request to fetch products by query. (paginated)
 */
export const productsByQuery = `
query ProductsByQuery($query: String!, $after: String, $pageSize: Int!, $currencyCode: currencyCode!) {
  site {
		search {
			searchProducts(filters: {searchTerm: $query}) {
				products(first: $pageSize, after: $after) {
					collectionInfo {
						totalItems
					}
					pageInfo {
						...MinPageInfo
					}
					edges {
						node {
							${productShared}
						}
						cursor
					}
				}
			}
		}
  }
}

${sharedProductFragments}`

/**
 * GraphQL request to fetch products by a list of IDs.
 */
export const productsByIds = `
query ProductsById($ids: [Int!], $currencyCode: currencyCode!) {
  site {
    products(entityIds: $ids) {
      collectionInfo {
        totalItems
      }
      pageInfo {
        ...MinPageInfo
      }
      edges {
        node {
		      ${productShared}
        }
      }
    }
  }
}

${sharedProductFragments}`

/**
 * GraphQL request to fetch products by category. (paginated)
 */
export const productsByCategory = `
query ProductsByCategory($id: Int!, $after: String, $pageSize: Int!, $currencyCode: currencyCode!) {
  site {
    category(entityId: $id) {
      entityId
      products(first: $pageSize, after: $after) {
        collectionInfo {
          totalItems
        }
        pageInfo {
          ...MinPageInfo
        }
        edges {
          node {
            ${productShared}
          }
          cursor
        }
      }
    }
  }
}

${sharedProductFragments}`