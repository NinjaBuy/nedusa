import { EntityManager } from "typeorm"

/**
 * @oas [delete] /admin/shipping-options/{id}
 * operationId: "DeleteShippingOptionsOption"
 * summary: "Delete Shipping Option"
 * description: "Delete a Shipping Option. Once deleted, it can't be used when creating orders or returns."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Shipping Option.
 * x-codegen:
 *   method: delete
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.shippingOptions.delete(optionId)
 *       .then(({ id, object, deleted }) => {
 *         console.log(id);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminDeleteShippingOption } from "ninja-react"
 *
 *       type Props = {
 *         shippingOptionId: string
 *       }
 *
 *       const ShippingOption = ({ shippingOptionId }: Props) => {
 *         const deleteShippingOption = useAdminDeleteShippingOption(
 *           shippingOptionId
 *         )
 *         // ...
 *
 *         const handleDelete = () => {
 *           deleteShippingOption.mutate(void 0, {
 *             onSuccess: ({ id, object, deleted }) => {
 *               console.log(id)
 *             }
 *           })
 *         }
 *
 *         // ...
 *       }
 *
 *       export default ShippingOption
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl -X DELETE '{backend_url}/admin/shipping-options/{option_id}' \
 *       -H 'x-ninja-access-token: {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Shipping Options
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdminShippingOptionsDeleteRes"
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
  const { option_id } = req.params
  const optionService = req.scope.resolve("shippingOptionService")

  const manager: EntityManager = req.scope.resolve("manager")
  await manager.transaction(async (transactionManager) => {
    return await optionService
      .withTransaction(transactionManager)
      .delete(option_id)
  })

  res.json({
    id: option_id,
    object: "shipping-option",
    deleted: true,
  })
}
