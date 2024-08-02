import { EntityManager } from "typeorm"
import { OrderEditService } from "../../../../services"

/**
 * @oas [delete] /admin/order-edits/{id}
 * operationId: "DeleteOrderEditsOrderEdit"
 * summary: "Delete an Order Edit"
 * description: "Delete an Order Edit. Only order edits that have the status `created` can be deleted."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Order Edit to delete.
 * x-codegen:
 *   method: delete
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.orderEdits.delete(orderEditId)
 *       .then(({ id, object, deleted }) => {
 *         console.log(id)
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminDeleteOrderEdit } from "ninja-react"
 *
 *       type Props = {
 *         orderEditId: string
 *       }
 *
 *       const OrderEdit = ({ orderEditId }: Props) => {
 *         const deleteOrderEdit = useAdminDeleteOrderEdit(
 *           orderEditId
 *         )
 *
 *         const handleDelete = () => {
 *           deleteOrderEdit.mutate(void 0, {
 *             onSuccess: ({ id, object, deleted }) => {
 *               console.log(id)
 *             }
 *           })
 *         }
 *
 *         // ...
 *       }
 *
 *       export default OrderEdit
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl -X DELETE '{backend_url}/admin/order-edits/{id}' \
 *       -H 'x-ninja-access-token: {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Order Edits
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdminOrderEditDeleteRes"
 *   "400":
 *     $ref: "#/components/responses/400_error"
 */
export default async (req, res) => {
  const { id } = req.params

  const orderEditService: OrderEditService =
    req.scope.resolve("orderEditService")

  const manager: EntityManager = req.scope.resolve("manager")

  await manager.transaction(async (transactionManager) => {
    await orderEditService.withTransaction(transactionManager).delete(id)
  })

  res.status(200).send({
    id,
    object: "order_edit",
    deleted: true,
  })
}
