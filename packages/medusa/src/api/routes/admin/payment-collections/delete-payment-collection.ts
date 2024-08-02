import { PaymentCollectionService } from "../../../../services"

/**
 * @oas [delete] /admin/payment-collections/{id}
 * operationId: "DeletePaymentCollectionsPaymentCollection"
 * summary: "Delete a Payment Collection"
 * description: "Delete a Payment Collection. Only payment collections with the statuses `canceled` or `not_paid` can be deleted."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Payment Collection.
 * x-codegen:
 *   method: delete
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.paymentCollections.delete(paymentCollectionId)
 *       .then(({ id, object, deleted }) => {
 *         console.log(id)
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminDeletePaymentCollection } from "ninja-react"
 *
 *       type Props = {
 *         paymentCollectionId: string
 *       }
 *
 *       const PaymentCollection = ({ paymentCollectionId }: Props) => {
 *         const deleteCollection = useAdminDeletePaymentCollection(
 *           paymentCollectionId
 *         )
 *         // ...
 *
 *         const handleDelete = () => {
 *           deleteCollection.mutate(void 0, {
 *             onSuccess: ({ id, object, deleted }) => {
 *               console.log(id)
 *             }
 *           })
 *         }
 *
 *         // ...
 *       }
 *
 *       export default PaymentCollection
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl -X DELETE '{backend_url}/admin/payment-collections/{id}' \
 *       -H 'x-ninja-access-token: {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Payment Collections
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdminPaymentCollectionDeleteRes"
 *   "400":
 *     $ref: "#/components/responses/400_error"
 *   "401":
 *     $ref: "#/components/responses/unauthorized"
 */
export default async (req, res) => {
  const { id } = req.params

  const paymentCollectionService: PaymentCollectionService = req.scope.resolve(
    "paymentCollectionService"
  )

  await paymentCollectionService.delete(id)

  res.status(200).json({ id, deleted: true, object: "payment_collection" })
}
