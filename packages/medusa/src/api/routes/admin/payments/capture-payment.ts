import { PaymentService } from "../../../../services"

/**
 * @oas [post] /admin/payments/{id}/capture
 * operationId: "PostPaymentsPaymentCapture"
 * summary: "Capture a Payment"
 * description: "Capture a Payment."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Payment.
 * x-codegen:
 *   method: capturePayment
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.payments.capturePayment(paymentId)
 *       .then(({ payment }) => {
 *         console.log(payment.id);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminPaymentsCapturePayment } from "ninja-react"
 *
 *       type Props = {
 *         paymentId: string
 *       }
 *
 *       const Payment = ({ paymentId }: Props) => {
 *         const capture = useAdminPaymentsCapturePayment(
 *           paymentId
 *         )
 *         // ...
 *
 *         const handleCapture = () => {
 *           capture.mutate(void 0, {
 *             onSuccess: ({ payment }) => {
 *               console.log(payment.amount)
 *             }
 *           })
 *         }
 *
 *         // ...
 *       }
 *
 *       export default Payment
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl -X POST '{backend_url}/admin/payments/{id}/capture' \
 *       -H 'x-ninja-access-token: {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Payments
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdminPaymentRes"
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

  const paymentService: PaymentService = req.scope.resolve("paymentService")

  const payment = await paymentService.capture(id)

  res.status(200).json({ payment })
}
