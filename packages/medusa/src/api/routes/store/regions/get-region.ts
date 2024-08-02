import RegionService from "../../../../services/region"
import { FindParams } from "../../../../types/common"

/**
 * @oas [get] /store/regions/{id}
 * operationId: GetRegionsRegion
 * summary: Get a Region
 * description: "Retrieve a Region's details."
 * parameters:
 *   - (path) id=* {string} The ID of the Region.
 * x-codegen:
 *   method: retrieve
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       ninja.regions.retrieve(regionId)
 *       .then(({ region }) => {
 *         console.log(region.id);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useRegion } from "ninja-react"
 *
 *       type Props = {
 *         regionId: string
 *       }
 *
 *       const Region = ({ regionId }: Props) => {
 *         const { region, isLoading } = useRegion(
 *           regionId
 *         )
 *
 *         return (
 *           <div>
 *             {isLoading && <span>Loading...</span>}
 *             {region && <span>{region.name}</span>}
 *           </div>
 *         )
 *       }
 *
 *       export default Region
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl '{backend_url}/store/regions/{id}'
 * tags:
 *   - Regions
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/StoreRegionsRes"
 *   "400":
 *     $ref: "#/components/responses/400_error"
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
  const regionService: RegionService = req.scope.resolve("regionService")

  const region = await regionService.retrieve(region_id, req.retrieveConfig)

  res.json({ region })
}

export class StoreGetRegionsRegionParams extends FindParams {}
