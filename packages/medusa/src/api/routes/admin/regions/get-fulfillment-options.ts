import { FulfillmentOption } from "."
import FulfillmentProviderService from "../../../../services/fulfillment-provider"
import RegionService from "../../../../services/region"

/**
 * @oas [get] /admin/regions/{id}/fulfillment-options
 * operationId: "GetRegionsRegionFulfillmentOptions"
 * summary: "List Fulfillment Options"
 * description: "Retrieve a list of fulfillment options available in a Region."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Region.
 * x-codegen:
 *   method: retrieveFulfillmentOptions
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.regions.retrieveFulfillmentOptions(regionId)
 *       .then(({ fulfillment_options }) => {
 *         console.log(fulfillment_options.length);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminRegionFulfillmentOptions } from "ninja-react"
 *
 *       type Props = {
 *         regionId: string
 *       }
 *
 *       const Region = ({
 *         regionId
 *       }: Props) => {
 *         const {
 *           fulfillment_options,
 *           isLoading
 *         } = useAdminRegionFulfillmentOptions(
 *           regionId
 *         )
 *
 *         return (
 *           <div>
 *             {isLoading && <span>Loading...</span>}
 *             {fulfillment_options && !fulfillment_options.length && (
 *               <span>No Regions</span>
 *             )}
 *             {fulfillment_options &&
 *               fulfillment_options.length > 0 && (
 *               <ul>
 *                 {fulfillment_options.map((option) => (
 *                   <li key={option.provider_id}>
 *                     {option.provider_id}
 *                   </li>
 *                 ))}
 *               </ul>
 *                 )}
 *           </div>
 *         )
 *       }
 *
 *       export default Region
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl '{backend_url}/admin/regions/{id}/fulfillment-options' \
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
 *           $ref: "#/components/schemas/AdminGetRegionsRegionFulfillmentOptionsRes"
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
  const { region_id } = req.params

  const fulfillmentProviderService: FulfillmentProviderService =
    req.scope.resolve("fulfillmentProviderService")

  const regionService: RegionService = req.scope.resolve("regionService")
  const region = await regionService.retrieve(region_id, {
    relations: ["fulfillment_providers"],
  })

  const fpsIds = region.fulfillment_providers.map((fp) => fp.id) || []

  const options: FulfillmentOption[] =
    await fulfillmentProviderService.listFulfillmentOptions(fpsIds)

  res.status(200).json({
    fulfillment_options: options,
  })
}
