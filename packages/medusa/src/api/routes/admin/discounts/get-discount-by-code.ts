import { Request, Response } from "express"
import DiscountService from "../../../../services/discount"
import { FindParams } from "../../../../types/common"

/**
 * @oas [get] /admin/discounts/code/{code}
 * operationId: "GetDiscountsDiscountCode"
 * summary: "Get Discount by Code"
 * description: "Retrieve a Discount's details by its discount code"
 * x-authenticated: true
 * parameters:
 *   - (path) code=* {string} The code of the Discount
 *   - (query) expand {string} Comma-separated relations that should be expanded in the returned discount.
 *   - (query) fields {string} Comma-separated fields that should be included in the returned discount.
 * x-codegen:
 *   method: retrieveByCode
 *   queryParams: AdminGetDiscountsDiscountCodeParams
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.discounts.retrieveByCode(code)
 *       .then(({ discount }) => {
 *         console.log(discount.id);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminGetDiscountByCode } from "ninja-react"
 *
 *       type Props = {
 *         discountCode: string
 *       }
 *
 *       const Discount = ({ discountCode }: Props) => {
 *         const { discount, isLoading } = useAdminGetDiscountByCode(
 *           discountCode
 *         )
 *
 *         return (
 *           <div>
 *             {isLoading && <span>Loading...</span>}
 *             {discount && <span>{discount.code}</span>}
 *           </div>
 *         )
 *       }
 *
 *       export default Discount
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl '{backend_url}/admin/discounts/code/{code}' \
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
 *           $ref: "#/components/schemas/AdminDiscountsRes"
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
  const { code } = req.params

  const discountService: DiscountService = req.scope.resolve("discountService")
  const discount = await discountService.retrieveByCode(
    code,
    req.retrieveConfig
  )

  res.status(200).json({ discount })
}

export class AdminGetDiscountsDiscountCodeParams extends FindParams {}
