import {
  StoreGetVariantsParams,
  StoreVariantsListRes,
  StoreVariantsRes,
} from "@ninjajs/ninja"
import qs from "qs"
import { ResponsePromise } from "../typings"
import BaseResource from "./base"

/**
 * This class is used to send requests to [Store Product Variant API Routes](https://docs.ninjajs.com/api/store#product-variants). All its method
 * are available in the JS Client under the `ninja.product.variants` property.
 * 
 * Product variants are the actual salable item in your store. Each variant is a combination of the different option values available on the product.
 */
class ProductVariantsResource extends BaseResource {
  /**
   * Retrieve a Product Variant's details. For accurate and correct pricing of the product variant based on the customer's context, it's highly recommended to pass fields such as
   * `region_id`, `currency_code`, and `cart_id` when available.
   * 
   * Passing `sales_channel_id` ensures retrieving only variants of products available in the current sales channel.
   * You can alternatively use a publishable API key in the request header instead of passing a `sales_channel_id`.
   * @param {string} id - The ID of the product variant.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<StoreVariantsRes>} Resolves to the product variant's details.
   * 
   * @example
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.product.variants.retrieve(productVariantId)
   * .then(({ variant }) => {
   *   console.log(variant.id);
   * })
   */
  retrieve(id: string, customHeaders: Record<string, any> = {}): ResponsePromise<StoreVariantsRes> {
    const path = `/store/variants/${id}`
    return this.client.request("GET", path, undefined, {}, customHeaders)
  }

  /**
   * Retrieves a list of product variants. The product variants can be filtered by fields such as `id` or `title` passed in the `query` parameter. The product variants can also be paginated.
   * 
   * For accurate and correct pricing of the product variants based on the customer's context, it's highly recommended to pass fields such as
   * `region_id`, `currency_code`, and `cart_id` when available.
   * 
   * Passing `sales_channel_id` ensures retrieving only variants of products available in the specified sales channel.
   * You can alternatively use a publishable API key in the request header instead of passing a `sales_channel_id`.
   * @param {StoreGetVariantsParams} query - Filters and pagination configurations applied on the retrieved product variants.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<StoreVariantsListRes>} Resolves to the list of product variants.
   * 
   * @example
   * To list product variants:
   * 
   * ```ts
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.product.variants.list()
   * .then(({ variants }) => {
   *   console.log(variants.length);
   * })
   * ```
   * 
   * To specify relations that should be retrieved within the product variants:
   * 
   * ```ts
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.product.variants.list({
   *   expand: "product"
   * })
   * .then(({ variants }) => {
   *   console.log(variants.length);
   * })
   * ```
   * 
   * By default, only the first `100` records are retrieved. You can control pagination by specifying the `limit` and `offset` properties:
   * 
   * ```ts
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.product.variants.list({
   *   expand: "product",
   *   limit,
   *   offset
   * })
   * .then(({ variants }) => {
   *   console.log(variants.length);
   * })
   * ```
   */
  list(query?: StoreGetVariantsParams, customHeaders: Record<string, any> = {}): ResponsePromise<StoreVariantsListRes> {
    let path = `/store/variants`
    if (query) {
      const queryString = qs.stringify(query)
      path += `?${queryString}`
    }

    return this.client.request("GET", path, undefined, {}, customHeaders)
  }
}

export default ProductVariantsResource
