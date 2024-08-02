import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator"
import { OrderService, ReturnService, SwapService } from "../../../../services"

import { Type } from "class-transformer"
import { isDefined } from "ninja-core-utils"
import { EntityManager } from "typeorm"
import { validator } from "../../../../utils/validator"
import { defaultRelations } from "."

/**
 * @oas [post] /admin/returns/{id}/receive
 * operationId: "PostReturnsReturnReceive"
 * summary: "Receive a Return"
 * description: "Mark a Return as received. This also updates the status of associated order, claim, or swap accordingly."
 * parameters:
 *   - (path) id=* {string} The ID of the Return.
 * requestBody:
 *   content:
 *     application/json:
 *       schema:
 *         $ref: "#/components/schemas/AdminPostReturnsReturnReceiveReq"
 * x-codegen:
 *   method: receive
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.returns.receive(returnId, {
 *         items: [
 *           {
 *             item_id,
 *             quantity: 1
 *           }
 *         ]
 *       })
 *       .then((data) => {
 *         console.log(data.return.id);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminReceiveReturn } from "ninja-react"
 *
 *       type ReceiveReturnData = {
 *         items: {
 *           item_id: string
 *           quantity: number
 *         }[]
 *       }
 *
 *       type Props = {
 *         returnId: string
 *       }
 *
 *       const Return = ({ returnId }: Props) => {
 *         const receiveReturn = useAdminReceiveReturn(
 *           returnId
 *         )
 *         // ...
 *
 *         const handleReceive = (data: ReceiveReturnData) => {
 *           receiveReturn.mutate(data, {
 *             onSuccess: ({ return: dataReturn }) => {
 *               console.log(dataReturn.status)
 *             }
 *           })
 *         }
 *
 *         // ...
 *       }
 *
 *       export default Return
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl -X POST '{backend_url}/admin/returns/{id}/receive' \
 *       -H 'x-ninja-access-token: {api_token}' \
 *       -H 'Content-Type: application/json' \
 *       --data-raw '{
 *           "items": [
 *             {
 *               "item_id": "asafg",
 *               "quantity": 1
 *             }
 *           ]
 *       }'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Returns
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdminReturnsRes"
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

  const validated = await validator(AdminPostReturnsReturnReceiveReq, req.body)

  const returnService: ReturnService = req.scope.resolve("returnService")
  const orderService: OrderService = req.scope.resolve("orderService")
  const swapService: SwapService = req.scope.resolve("swapService")
  const entityManager: EntityManager = req.scope.resolve("manager")

  let receivedReturn
  await entityManager.transaction(async (manager) => {
    let refundAmount = validated.refund

    if (isDefined(validated.refund) && validated.refund! < 0) {
      refundAmount = 0
    }

    receivedReturn = await returnService
      .withTransaction(manager)
      .receive(id, validated.items, refundAmount, true, {
        locationId: validated.location_id,
      })

    if (receivedReturn.order_id) {
      await orderService
        .withTransaction(manager)
        .registerReturnReceived(
          receivedReturn.order_id,
          receivedReturn,
          refundAmount
        )
    }

    if (receivedReturn.swap_id) {
      await swapService
        .withTransaction(manager)
        .registerReceived(receivedReturn.swap_id)
    }
  })

  receivedReturn = await returnService.retrieve(id, {
    relations: defaultRelations,
  })

  res.status(200).json({ return: receivedReturn })
}

class Item {
  @IsString()
  item_id: string

  @IsNumber()
  quantity: number
}

/**
 * @schema AdminPostReturnsReturnReceiveReq
 * type: object
 * description: "The details of the received return."
 * required:
 *   - items
 * properties:
 *   items:
 *     description: The Line Items that have been received.
 *     type: array
 *     items:
 *       type: object
 *       required:
 *         - item_id
 *         - quantity
 *       properties:
 *         item_id:
 *           description: The ID of the Line Item.
 *           type: string
 *         quantity:
 *           description: The quantity of the Line Item.
 *           type: integer
 *   refund:
 *     description: The amount to refund.
 *     type: number
 *   location_id:
 *     description: The ID of the location to return items from.
 *     type: string
 */
export class AdminPostReturnsReturnReceiveReq {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Item)
  items: Item[]

  @IsOptional()
  @IsNumber()
  refund?: number

  @IsOptional()
  @IsString()
  location_id?: string
}
