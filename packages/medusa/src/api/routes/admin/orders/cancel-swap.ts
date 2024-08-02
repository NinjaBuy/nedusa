import { OrderService, SwapService } from "../../../../services"

import { EntityManager } from "typeorm"
import { NinjaError } from "ninja-core-utils"
import { FindParams } from "../../../../types/common"
import { cleanResponseData } from "../../../../utils/clean-response-data"

/**
 * @oas [post] /admin/orders/{id}/swaps/{swap_id}/cancel
 * operationId: "PostOrdersSwapCancel"
 * summary: "Cancel a Swap"
 * description: "Cancel a Swap and change its status."
 * x-authenticated: true
 * externalDocs:
 *   description: Canceling a swap
 *   url: https://docs.ninjajs.com/modules/orders/swaps#canceling-a-swap
 * parameters:
 *   - (path) id=* {string} The ID of the Order the swap is associated with.
 *   - (path) swap_id=* {string} The ID of the Swap.
 *   - (query) expand {string} Comma-separated relations that should be expanded in the returned order.
 *   - (query) fields {string} Comma-separated fields that should be included in the returned order.
 * x-codegen:
 *   method: cancelSwap
 *   params: AdminPostOrdersSwapCancelParams
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.orders.cancelSwap(orderId, swapId)
 *       .then(({ order }) => {
 *         console.log(order.id);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminCancelSwap } from "ninja-react"
 *
 *       type Props = {
 *         orderId: string,
 *         swapId: string
 *       }
 *
 *       const Swap = ({
 *         orderId,
 *         swapId
 *       }: Props) => {
 *         const cancelSwap = useAdminCancelSwap(
 *           orderId
 *         )
 *         // ...
 *
 *         const handleCancel = () => {
 *           cancelSwap.mutate(swapId, {
 *             onSuccess: ({ order }) => {
 *               console.log(order.swaps)
 *             }
 *           })
 *         }
 *
 *         // ...
 *       }
 *
 *       export default Swap
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl -X POST '{backend_url}/admin/orders/{order_id}/swaps/{swap_id}/cancel' \
 *       -H 'x-ninja-access-token: {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Orders
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdminOrdersRes"
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
  const { id, swap_id } = req.params

  const swapService: SwapService = req.scope.resolve("swapService")
  const orderService: OrderService = req.scope.resolve("orderService")

  const swap = await swapService.retrieve(swap_id)

  if (swap.order_id !== id) {
    throw new NinjaError(
      NinjaError.Types.NOT_FOUND,
      `no swap was found with the id: ${swap_id} related to order: ${id}`
    )
  }

  const manager: EntityManager = req.scope.resolve("manager")
  await manager.transaction(async (transactionManager) => {
    return await swapService.withTransaction(transactionManager).cancel(swap_id)
  })

  const order = await orderService.retrieveWithTotals(id, req.retrieveConfig, {
    includes: req.includes,
  })

  res.json({ order: cleanResponseData(order, []) })
}

export class AdminPostOrdersSwapCancelParams extends FindParams {}
