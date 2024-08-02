import { FlagRouter } from "@ninjajs/utils"
import { defaultRelationsExtended } from "."
import {
  FulfillmentProviderService,
  PaymentProviderService,
  StoreService,
} from "../../../../services"
import { ExtendedStoreDTO } from "../../../../types/store"
import { NinjaModule } from "@ninjajs/modules-sdk"

/**
 * @oas [get] /admin/store
 * operationId: "GetStore"
 * summary: "Get Store details"
 * description: "Retrieve the Store's details."
 * x-authenticated: true
 * x-codegen:
 *   method: retrieve
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.store.retrieve()
 *       .then(({ store }) => {
 *         console.log(store.id);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminStore } from "ninja-react"
 *
 *       const Store = () => {
 *         const {
 *           store,
 *           isLoading
 *         } = useAdminStore()
 *
 *         return (
 *           <div>
 *             {isLoading && <span>Loading...</span>}
 *             {store && <span>{store.name}</span>}
 *           </div>
 *         )
 *       }
 *
 *       export default Store
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl '{backend_url}/admin/store' \
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
 *           $ref: "#/components/schemas/AdminExtendedStoresRes"
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
  const storeService: StoreService = req.scope.resolve("storeService")

  const featureFlagRouter: FlagRouter = req.scope.resolve("featureFlagRouter")

  const paymentProviderService: PaymentProviderService = req.scope.resolve(
    "paymentProviderService"
  )
  const fulfillmentProviderService: FulfillmentProviderService =
    req.scope.resolve("fulfillmentProviderService")

  const relations = [...defaultRelationsExtended]
  if (featureFlagRouter.isFeatureEnabled("sales_channels")) {
    relations.push("default_sales_channel")
  }

  const data = (await storeService.retrieve({
    relations,
  })) as ExtendedStoreDTO

  data.feature_flags = featureFlagRouter.listFlags()
  data.modules = NinjaModule.getLoadedModules()
    .map((loadedModule) => {
      return Object.entries(loadedModule).map(([key, service]) => {
        return {
          module: key,
          resolution: service.__definition.defaultPackage,
        }
      })
    })
    .flat()

  const paymentProviders = await paymentProviderService.list()
  const fulfillmentProviders = await fulfillmentProviderService.list()

  data.payment_providers = paymentProviders
  data.fulfillment_providers = fulfillmentProviders

  res.status(200).json({ store: data })
}
