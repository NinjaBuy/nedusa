import {
  AdminDeleteShippingProfileRes,
  AdminPostShippingProfilesProfileReq,
  AdminPostShippingProfilesReq,
  AdminShippingProfilesListRes,
  AdminShippingProfilesRes,
} from "@ninjajs/ninja"
import { ResponsePromise } from "../../typings"
import BaseResource from "../base"

/**
 * This class is used to send requests to [Admin Shipping Profile API Routes](https://docs.ninjajs.com/api/admin#shipping-profiles). All its method
 * are available in the JS Client under the `ninja.admin.shippingProfiles` property.
 * 
 * All methods in this class require {@link AdminAuthResource.createSession | user authentication}.
 * 
 * A shipping profile is used to group products that can be shipped in the same manner.
 * They are created by the admin and they're not associated with a fulfillment provider.
 * 
 * Related Guide: [Shipping Profile architecture](https://docs.ninjajs.com/modules/carts-and-checkout/shipping#shipping-profile).
 */
class AdminShippingProfilesResource extends BaseResource {
  /**
   * Create a shipping profile.
   * @param {AdminPostShippingProfilesReq} payload - The shipping profile to create.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<AdminShippingProfilesRes>} Resolves to the shipping profile's details.
   * 
   * @example
   * import { ShippingProfileType } from "@ninjajs/ninja"
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.admin.shippingProfiles.create({
   *   name: "Large Products",
   *   type: ShippingProfileType.DEFAULT
   * })
   * .then(({ shipping_profile }) => {
   *   console.log(shipping_profile.id);
   * })
   */
  create(
    payload: AdminPostShippingProfilesReq,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminShippingProfilesRes> {
    const path = `/admin/shipping-profiles/`
    return this.client.request("POST", path, payload, {}, customHeaders)
  }

  /**
   * Update a shipping profile's details.
   * @param {string} id - The shipping profile's ID.
   * @param {AdminPostShippingProfilesProfileReq} payload - The attributes to update in the shipping profile.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<AdminShippingProfilesRes>} Resolves to the shipping profile's details.
   * 
   * @example
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.admin.shippingProfiles.update(shippingProfileId, {
   *   name: 'Large Products'
   * })
   * .then(({ shipping_profile }) => {
   *   console.log(shipping_profile.id);
   * })
   */
  update(
    id: string,
    payload: AdminPostShippingProfilesProfileReq,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminShippingProfilesRes> {
    const path = `/admin/shipping-profiles/${id}`
    return this.client.request("POST", path, payload, {}, customHeaders)
  }

  /**
   * Delete a shipping profile. Associated shipping options are deleted as well.
   * @param {string} id - The shipping profile's ID.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<AdminDeleteShippingProfileRes>} Resolves to the deletion operation's details.
   * 
   * @example
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.admin.shippingProfiles.delete(profileId)
   * .then(({ id, object, deleted }) => {
   *   console.log(id);
   * })
   */
  delete(
    id: string,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminDeleteShippingProfileRes> {
    const path = `/admin/shipping-profiles/${id}`
    return this.client.request("DELETE", path, undefined, {}, customHeaders)
  }

  /**
   * Retrieve a shipping profile's details.
   * @param {string} id - The shipping profile's ID.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<AdminShippingProfilesRes>} Resolves to the shipping profile's details.
   * 
   * @example
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.admin.shippingProfiles.retrieve(profileId)
   * .then(({ shipping_profile }) => {
   *   console.log(shipping_profile.id);
   * })
   */
  retrieve(
    id: string,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminShippingProfilesRes> {
    const path = `/admin/shipping-profiles/${id}`
    return this.client.request("GET", path, undefined, {}, customHeaders)
  }

  /**
   * Retrieve a list of shipping profiles.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<AdminShippingProfilesListRes>} Resolves to the list of shipping profiles.
   * 
   * @example
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.admin.shippingProfiles.list()
   * .then(({ shipping_profiles }) => {
   *   console.log(shipping_profiles.length);
   * })
   */
  list(
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminShippingProfilesListRes> {
    const path = `/admin/shipping-profiles/`
    return this.client.request("GET", path, undefined, {}, customHeaders)
  }
}

export default AdminShippingProfilesResource
