import { defaultAdminRegionFields, defaultAdminRegionRelations } from "."

import { EntityManager } from "typeorm"
import RegionService from "../../../../services/region"

/**
 * @oas [delete] /admin/regions/{id}/payment-providers/{provider_id}
 * operationId: "PostRegionsRegionPaymentProvidersProvider"
 * summary: "Remove Payment Provider"
 * description: "Remove a Payment Provider from a Region. The payment provider will still be available for usage in other regions."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Region.
 *   - (path) provider_id=* {string} The ID of the Payment Provider.
 * x-codegen:
 *   method: deletePaymentProvider
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.regions.deletePaymentProvider(regionId, "manual")
 *       .then(({ region }) => {
 *         console.log(region.id);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import {
 *         useAdminRegionDeletePaymentProvider
 *       } from "ninja-react"
 *
 *       type Props = {
 *         regionId: string
 *       }
 *
 *       const Region = ({
 *         regionId
 *       }: Props) => {
 *         const removePaymentProvider =
 *           useAdminRegionDeletePaymentProvider(regionId)
 *         // ...
 *
 *         const handleRemovePaymentProvider = (
 *           providerId: string
 *         ) => {
 *           removePaymentProvider.mutate(providerId, {
 *             onSuccess: ({ region }) => {
 *               console.log(region.payment_providers)
 *             }
 *           })
 *         }
 *
 *         // ...
 *       }
 *
 *       export default Region
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl -X DELETE '{backend_url}/admin/regions/{id}/payment-providers/{provider_id}' \
 *       -H 'x-ninja-access-token: {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Regions
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdminRegionsRes"
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
  const { region_id, provider_id } = req.params

  const regionService: RegionService = req.scope.resolve("regionService")
  const manager: EntityManager = req.scope.resolve("manager")
  await manager.transaction(async (transactionManager) => {
    return await regionService
      .withTransaction(transactionManager)
      .removePaymentProvider(region_id, provider_id)
  })

  const region = await regionService.retrieve(region_id, {
    select: defaultAdminRegionFields,
    relations: defaultAdminRegionRelations,
  })

  res.json({ region })
}
