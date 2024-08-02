import { defaultAdminSwapFields, defaultAdminSwapRelations } from "."

import { SwapService } from "../../../../services"

/**
 * @oas [get] /admin/swaps/{id}
 * operationId: "GetSwapsSwap"
 * summary: "Get a Swap"
 * description: "Retrieve a Swap's details."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Swap.
 * x-codegen:
 *   method: retrieve
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.swaps.retrieve(swapId)
 *       .then(({ swap }) => {
 *         console.log(swap.id);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminSwap } from "ninja-react"
 *
 *       type Props = {
 *         swapId: string
 *       }
 *
 *       const Swap = ({ swapId }: Props) => {
 *         const { swap, isLoading } = useAdminSwap(swapId)
 *
 *         return (
 *           <div>
 *             {isLoading && <span>Loading...</span>}
 *             {swap && <span>{swap.id}</span>}
 *           </div>
 *         )
 *       }
 *
 *       export default Swap
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl '{backend_url}/admin/swaps/{id}' \
 *       -H 'x-ninja-access-token: {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Swaps
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdminSwapsRes"
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
  const { id } = req.params

  const swapService: SwapService = req.scope.resolve("swapService")

  const swap = await swapService.retrieve(id, {
    select: defaultAdminSwapFields,
    relations: defaultAdminSwapRelations,
  })

  res.json({ swap })
}
