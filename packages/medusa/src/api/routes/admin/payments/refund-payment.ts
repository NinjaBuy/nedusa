import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator"
import { RefundReason } from "../../../../models"

import { PaymentService } from "../../../../services"

/**
 * @oas [post] /admin/payments/{id}/refund
 * operationId: "PostPaymentsPaymentRefunds"
 * summary: "Refund Payment"
 * description: "Refund a payment. The payment must be captured first."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Payment.
 * requestBody:
 *   content:
 *     application/json:
 *       schema:
 *         $ref: "#/components/schemas/AdminPostPaymentRefundsReq"
 * x-codegen:
 *   method: refundPayment
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.payments.refundPayment(paymentId, {
 *         amount: 1000,
 *         reason: "return",
 *         note: "Do not like it",
 *       })
 *       .then(({ payment }) => {
 *         console.log(payment.id);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { RefundReason } from "@ninjajs/ninja"
 *       import { useAdminPaymentsRefundPayment } from "ninja-react"
 *
 *       type Props = {
 *         paymentId: string
 *       }
 *
 *       const Payment = ({ paymentId }: Props) => {
 *         const refund = useAdminPaymentsRefundPayment(
 *           paymentId
 *         )
 *         // ...
 *
 *         const handleRefund = (
 *           amount: number,
 *           reason: RefundReason,
 *           note: string
 *         ) => {
 *           refund.mutate({
 *             amount,
 *             reason,
 *             note
 *           }, {
 *             onSuccess: ({ refund }) => {
 *               console.log(refund.amount)
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
 *       curl -X POST '{backend_url}/admin/payments/pay_123/refund' \
 *       -H 'x-ninja-access-token: {api_token}' \
 *       -H 'Content-Type: application/json' \
 *       --data-raw '{
 *           "amount": 1000,
 *           "reason": "return",
 *           "note": "Do not like it"
 *       }'
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
 *           $ref: "#/components/schemas/AdminRefundRes"
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

  const data = req.validatedBody as AdminPostPaymentRefundsReq

  const paymentService: PaymentService = req.scope.resolve("paymentService")

  const refund = await paymentService.refund(
    id,
    data.amount,
    data.reason,
    data.note
  )

  res.status(200).json({ refund })
}

/**
 * @schema AdminPostPaymentRefundsReq
 * type: object
 * description: "The details of the refund to create."
 * required:
 *   - amount
 *   - reason
 * properties:
 *   amount:
 *     description: The amount to refund.
 *     type: integer
 *   reason:
 *     description: The reason for the Refund.
 *     type: string
 *   note:
 *     description: A note with additional details about the Refund.
 *     type: string
 */
export class AdminPostPaymentRefundsReq {
  @IsInt()
  @IsNotEmpty()
  amount: number

  @IsEnum(RefundReason)
  @IsNotEmpty()
  reason: RefundReason

  @IsString()
  @IsOptional()
  note?: string
}
