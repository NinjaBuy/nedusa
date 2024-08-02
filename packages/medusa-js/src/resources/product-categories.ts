import {
  StoreGetProductCategoriesParams,
  StoreGetProductCategoriesRes,
  StoreGetProductCategoriesCategoryParams,
  StoreGetProductCategoriesCategoryRes,
} from "@ninjajs/ninja"
import qs from "qs"
import { ResponsePromise } from "../typings"
import BaseResource from "./base"

/**
 * This class is used to send requests to [Store Product Category API Routes](https://docs.ninjajs.com/api/store#product-categories_getproductcategories). All its method
 * are available in the JS Client under the `ninja.productCategories` property.
 * 
 * Products can be categoriezed into categories. A product can be associated more than one category.
 * Using the methods in this class, you can list or retrieve a category's details and products.
 * 
 * Related Guide: [How to use product categories in a storefront](https://docs.ninjajs.com/modules/products/storefront/use-categories).
 * 
 * @featureFlag product_categories
 */
class ProductCategoriesResource extends BaseResource {
  /**
   * Retrieve a Product Category's details.
   * @param {string} id - The ID of the product category.
   * @param {StoreGetProductCategoriesCategoryParams} query - Configurations to apply on the retrieved product categories.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<StoreGetProductCategoriesCategoryRes>} Resolves to the product category's details.
   * 
   * @example
   * A simple example that retrieves a product category by its ID:
   * 
   * ```ts
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.productCategories.retrieve(productCategoryId)
   * .then(({ product_category }) => {
   *   console.log(product_category.id);
   * })
   * ```
   * 
   * To specify relations that should be retrieved:
   * 
   * ```ts
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.productCategories.retrieve(productCategoryId, {
   *   expand: "products"
   * })
   * .then(({ product_category }) => {
   *   console.log(product_category.id);
   * })
   * ```
   */
  retrieve(
    id: string,
    query?: StoreGetProductCategoriesCategoryParams,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<StoreGetProductCategoriesCategoryRes> {
    let path = `/store/product-categories/${id}`

    if (query) {
      const queryString = qs.stringify(query)
      path = `${path}?${queryString}`
    }

    return this.client.request("GET", path, undefined, {}, customHeaders)
  }

  /**
   * Retrieve a list of product categories. The product categories can be filtered by fields such as `handle` or `q` passed in the `query` parameter. 
   * The product categories can also be paginated. This method can also be used to retrieve a product category by its handle.
   * @param {StoreGetProductCategoriesParams} query - Filters and pagination configurations to apply on the retrieved product categories.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<StoreGetProductCategoriesRes>} Resolves to the list of product categories with pagination fields.
   * 
   * @example
   * To list product categories:
   * 
   * ```ts
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * ninja.productCategories.list()
   * .then(({ product_categories, limit, offset, count }) => {
   *   console.log(product_categories.length);
   * })
   * ```
   * 
   * To retrieve a product category by its handle:
   * 
   * ```ts
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * ninja.productCategories.list({
   *   handle: "women",
   * })
   * .then(({ product_categories, limit, offset, count }) => {
   *   if (!product_categories.length) {
   *     // category does not exist
   *   }
   *   const category = product_categories[0]
   * })
   * ```
   * 
   * To specify relations that should be retrieved within the product categories:
   * 
   * ```ts
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * ninja.productCategories.list({
   *   expand: "products"
   * })
   * .then(({ product_categories, limit, offset, count }) => {
   *   console.log(product_categories.length);
   * })
   * ```
   * 
   * By default, only the first `100` records are retrieved. You can control pagination by specifying the `limit` and `offset` properties:
   * 
   * ```ts
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * ninja.productCategories.list({
   *   expand: "products",
   *   limit,
   *   offset
   * })
   * .then(({ product_categories, limit, offset, count }) => {
   *   console.log(product_categories.length);
   * })
   * ```
   */
  list(
    query?: StoreGetProductCategoriesParams,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<StoreGetProductCategoriesRes> {
    let path = `/store/product-categories`

    if (query) {
      const queryString = qs.stringify(query)
      path = `${path}?${queryString}`
    }

    return this.client.request("GET", path, undefined, {}, customHeaders)
  }
}

export default ProductCategoriesResource
