import { DraftOrderService } from "../../../../services"
import { EntityManager } from "typeorm"

/**
 * @oas [delete] /admin/draft-orders/{id}
 * operationId: DeleteDraftOrdersDraftOrder
 * summary: Delete a Draft Order
 * description: "Delete a Draft Order."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Draft Order.
 * x-codegen:
 *   method: delete
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.draftOrders.delete(draftOrderId)
 *       .then(({ id, object, deleted }) => {
 *         console.log(id);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminDeleteDraftOrder } from "ninja-react"
 *
 *       type Props = {
 *         draftOrderId: string
 *       }
 *
 *       const DraftOrder = ({ draftOrderId }: Props) => {
 *         const deleteDraftOrder = useAdminDeleteDraftOrder(
 *           draftOrderId
 *         )
 *         // ...
 *
 *         const handleDelete = () => {
 *           deleteDraftOrder.mutate(void 0, {
 *             onSuccess: ({ id, object, deleted }) => {
 *               console.log(id)
 *             }
 *           })
 *         }
 *
 *         // ...
 *       }
 *
 *       export default DraftOrder
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl -X DELETE '{backend_url}/admin/draft-orders/{id}' \
 *       -H 'x-ninja-access-token: {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Draft Orders
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdminDraftOrdersDeleteRes"
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

  const draftOrderService: DraftOrderService =
    req.scope.resolve("draftOrderService")

  const manager: EntityManager = req.scope.resolve("manager")
  await manager.transaction(async (transactionManager) => {
    return await draftOrderService
      .withTransaction(transactionManager)
      .delete(id)
  })

  res.json({
    id,
    object: "draft-order",
    deleted: true,
  })
}
