import {
  AdminSwapsRes,
  AdminSwapsListRes,
  AdminGetSwapsParams,
} from "@ninjajs/ninja"
import qs from "qs"
import { ResponsePromise } from "../../typings"
import BaseResource from "../base"

/**
 * This class is used to send requests to [Admin Swap API Routes](https://docs.ninjajs.com/api/admin#swaps). All its method
 * are available in the JS Client under the `ninja.admin.swaps` property.
 * 
 * All methods in this class require {@link AdminAuthResource.createSession | user authentication}.
 * 
 * A swap is created by a customer or an admin to exchange an item with a new one.
 * Creating a swap implicitely includes creating a return for the item being exchanged.
 * 
 * Related Guide: [How to manage swaps](https://docs.ninjajs.com/modules/orders/admin/manage-swaps)
 */
class AdminSwapsResource extends BaseResource {
  /**
   * Retrieve a swap's details.
   * @param {string} id - The swap's ID.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<AdminSwapsRes>} Resolves to the swap's details.
   * 
   * @example
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.admin.swaps.retrieve(swapId)
   * .then(({ swap }) => {
   *   console.log(swap.id);
   * })
   */
  retrieve(
    id: string,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminSwapsRes> {
    const path = `/admin/swaps/${id}`
    return this.client.request("GET", path, undefined, {}, customHeaders)
  }

  /**
   * Retrieve a list of swaps. The swaps can be paginated.
   * @param {AdminGetSwapsParams} query - Pagination configurations to apply on the retrieved swaps.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<AdminSwapsListRes>} Resolves to the list of swaps with pagination fields.
   * 
   * @example
   * To list swaps:
   * 
   * ```ts
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.admin.swaps.list()
   * .then(({ swaps }) => {
   *   console.log(swaps.length);
   * })
   * ```
   * 
   * By default, only the first `50` records are retrieved. You can control pagination by specifying the `limit` and `offset` properties:
   * 
   * ```ts
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.admin.swaps.list({
   *   limit,
   *   offset
   * })
   * .then(({ swaps }) => {
   *   console.log(swaps.length);
   * })
   * ```
   */
  list(
    query?: AdminGetSwapsParams,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminSwapsListRes> {
    let path = `/admin/swaps/`

    if (query) {
      const queryString = qs.stringify(query)
      path = `/admin/swaps?${queryString}`
    }

    return this.client.request("GET", path, undefined, {}, customHeaders)
  }
}

export default AdminSwapsResource
