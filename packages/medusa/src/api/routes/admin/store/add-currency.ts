import { StoreService } from "../../../../services"
import { EntityManager } from "typeorm"

/**
 * @oas [post] /admin/store/currencies/{code}
 * operationId: "PostStoreCurrenciesCode"
 * summary: "Add a Currency Code"
 * description: "Add a Currency Code to the available currencies in a store. This does not create new currencies, as currencies are defined within the Ninja backend.
 * To create a currency, you can create a migration that inserts the currency into the database."
 * x-authenticated: true
 * parameters:
 *   - in: path
 *     name: code
 *     required: true
 *     description: The 3 character ISO currency code.
 *     schema:
 *       type: string
 *       externalDocs:
 *         url: https://en.wikipedia.org/wiki/ISO_4217#Active_codes
 *         description: See a list of codes.
 * x-codegen:
 *   method: addCurrency
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.store.addCurrency("eur")
 *       .then(({ store }) => {
 *         console.log(store.currencies);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminAddStoreCurrency } from "ninja-react"
 *
 *       const Store = () => {
 *         const addCurrency = useAdminAddStoreCurrency()
 *         // ...
 *
 *         const handleAdd = (code: string) => {
 *           addCurrency.mutate(code, {
 *             onSuccess: ({ store }) => {
 *               console.log(store.currencies)
 *             }
 *           })
 *         }
 *
 *         // ...
 *       }
 *
 *       export default Store
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl -X POST '{backend_url}/admin/store/currencies/{currency_code}' \
 *       -H 'x-ninja-access-token: {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Store
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdminStoresRes"
 *   "400":
 *     $ref: "#/components/responses/400_error"
 *   "401":
 *     $ref: "#/components/responses/unauthorized"
 *   "404":
 *     $ref: "#/components/responses/not_found_error"
 *   "409":
 *     $ref: "#/components/responses/invalid_state_error"
 *   "422":
 *     $ref: "#/components/responses/invalid_request_error"
 *   "500":
 *     $ref: "#/components/responses/500_error"
 */
export default async (req, res) => {
  const { currency_code } = req.params

  const storeService: StoreService = req.scope.resolve("storeService")
  const manager: EntityManager = req.scope.resolve("manager")
  const data = await manager.transaction(async (transactionManager) => {
    return await storeService
      .withTransaction(transactionManager)
      .addCurrency(currency_code)
  })

  res.status(200).json({ store: data })
}
