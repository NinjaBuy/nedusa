import {
  AdminExtendedStoresRes,
  AdminPaymentProvidersList,
  AdminPostStoreReq,
  AdminStoresRes,
  AdminTaxProvidersList,
} from "@ninjajs/ninja"
import { ResponsePromise } from "../../typings"
import BaseResource from "../base"

/**
 * This class is used to send requests to [Admin Store API Routes](https://docs.ninjajs.com/api/admin#store). All its method
 * are available in the JS Client under the `ninja.admin.store` property.
 * 
 * All methods in this class require {@link AdminAuthResource.createSession | user authentication}.
 * 
 * A store indicates the general configurations and details about the commerce store. By default, there's only one store in the Ninja backend.
 * Admins can manage the store and its details or configurations.
 */
class AdminStoresResource extends BaseResource {
  /**
   * Update the store's details.
   * @param {AdminPostStoreReq} payload - The attributes to update in the store.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<AdminStoresRes>} Resolves to the store's details.
   * 
   * @example
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.admin.store.update({
   *   name: "Ninja Store"
   * })
   * .then(({ store }) => {
   *   console.log(store.id);
   * })
   */
  update(
    payload: AdminPostStoreReq,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminStoresRes> {
    const path = `/admin/store/`
    return this.client.request("POST", path, payload, {}, customHeaders)
  }

  /**
   * Add a currency code to the available currencies in a store. This doesn't create new currencies, as currencies are defined within the Ninja backend. 
   * To create a currency, you can [create a migration](https://docs.ninjajs.com/development/entities/migrations/create) that inserts the currency into the database.
   * @param {string} currency_code - The code of the currency to add to the store.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<AdminStoresRes>} Resolves to the store's details.
   * 
   * @example
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.admin.store.addCurrency("eur")
   * .then(({ store }) => {
   *   console.log(store.currencies);
   * })
   */
  addCurrency(
    currency_code: string,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminStoresRes> {
    const path = `/admin/store/${currency_code}`
    return this.client.request("POST", path, undefined, {}, customHeaders)
  }

  /**
   * Delete a currency code from the available currencies in a store. This doesn't completely delete the currency and it can be added again later to the store.
   * @param {string} currency_code - The code of the currency to delete from the store.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<AdminStoresRes>} Resolves to the store's details.
   * 
   * @example
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.admin.store.deleteCurrency("eur")
   * .then(({ store }) => {
   *   console.log(store.currencies);
   * })
   */
  deleteCurrency(
    currency_code: string,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminStoresRes> {
    const path = `/admin/store/currencies/${currency_code}`
    return this.client.request("DELETE", path, undefined, {}, customHeaders)
  }

  /**
   * Retrieve the store's details.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<AdminExtendedStoresRes>} Resolves to the store's details.
   * 
   * @example
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.admin.store.retrieve()
   * .then(({ store }) => {
   *   console.log(store.id);
   * })
   */
  retrieve(
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminExtendedStoresRes> {
    const path = `/admin/store/`
    return this.client.request("GET", path, undefined, {}, customHeaders)
  }

  /**
   * Retrieve a list of available payment providers in a store.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<AdminPaymentProvidersList>} Resolves to the list of payment providers.
   * 
   * @example
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.admin.store.listPaymentProviders()
   * .then(({ payment_providers }) => {
   *   console.log(payment_providers.length);
   * })
   */
  listPaymentProviders(
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminPaymentProvidersList> {
    const path = `/admin/store/payment-providers`
    return this.client.request("GET", path, undefined, {}, customHeaders)
  }

  /**
   * Retrieve a list of available tax providers in a store.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<AdminTaxProvidersList>} Resolves to the list of tax providers.
   * 
   * @example
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.admin.store.listTaxProviders()
   * .then(({ tax_providers }) => {
   *   console.log(tax_providers.length);
   * })
   */
  listTaxProviders(
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminTaxProvidersList> {
    const path = `/admin/store/tax-providers`
    return this.client.request("GET", path, undefined, {}, customHeaders)
  }
}

export default AdminStoresResource
