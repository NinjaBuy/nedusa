import { Request, Response } from "express"
import DiscountConditionService from "../../../../services/discount-condition"
import { FindParams } from "../../../../types/common"

/**
 * @oas [get] /admin/discounts/{discount_id}/conditions/{condition_id}
 * operationId: "GetDiscountsDiscountConditionsCondition"
 * summary: "Get a Condition"
 * description: "Retrieve a Discount Condition's details."
 * x-authenticated: true
 * parameters:
 *   - (path) discount_id=* {string} The ID of the Discount.
 *   - (path) condition_id=* {string} The ID of the Discount Condition.
 *   - (query) expand {string} Comma-separated relations that should be expanded in the returned discount condition.
 *   - (query) fields {string} Comma-separated fields that should be included in the returned discount condition.
 * x-codegen:
 *   method: getCondition
 *   queryParams: AdminGetDiscountsDiscountConditionsConditionParams
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.discounts.getCondition(discountId, conditionId)
 *       .then(({ discount_condition }) => {
 *         console.log(discount_condition.id);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminGetDiscountCondition } from "ninja-react"
 *
 *       type Props = {
 *         discountId: string
 *         discountConditionId: string
 *       }
 *
 *       const DiscountCondition = ({
 *         discountId,
 *         discountConditionId
 *       }: Props) => {
 *         const {
 *           discount_condition,
 *           isLoading
 *         } = useAdminGetDiscountCondition(
 *           discountId,
 *           discountConditionId
 *         )
 *
 *         return (
 *           <div>
 *             {isLoading && <span>Loading...</span>}
 *             {discount_condition && (
 *               <span>{discount_condition.type}</span>
 *             )}
 *           </div>
 *         )
 *       }
 *
 *       export default DiscountCondition
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl '{backend_url}/admin/discounts/{id}/conditions/{condition_id}' \
 *       -H 'x-ninja-access-token: {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Discounts
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdminDiscountConditionsRes"
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

export default async (req: Request, res: Response) => {
  const { condition_id } = req.params

  const conditionService: DiscountConditionService = req.scope.resolve(
    "discountConditionService"
  )

  const discountCondition = await conditionService.retrieve(
    condition_id,
    req.retrieveConfig
  )

  res.status(200).json({ discount_condition: discountCondition })
}

export class AdminGetDiscountsDiscountConditionsConditionParams extends FindParams {}
