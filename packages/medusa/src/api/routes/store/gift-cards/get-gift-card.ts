import { defaultStoreGiftCardFields, defaultStoreGiftCardRelations } from "."

import GiftCardService from "../../../../services/gift-card"
import { Logger } from "@ninjajs/types"

/**
 * @oas [get] /store/gift-cards/{code}
 * operationId: "GetGiftCardsCode"
 * summary: "Get Gift Card by Code"
 * description: "Retrieve a Gift Card's details by its associated unique code."
 * parameters:
 *   - (path) code=* {string} The unique Gift Card code.
 * x-codegen:
 *   method: retrieve
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       ninja.giftCards.retrieve(code)
 *       .then(({ gift_card }) => {
 *         console.log(gift_card.id);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useGiftCard } from "ninja-react"
 *
 *       type Props = {
 *         giftCardCode: string
 *       }
 *
 *       const GiftCard = ({ giftCardCode }: Props) => {
 *         const { gift_card, isLoading, isError } = useGiftCard(
 *           giftCardCode
 *         )
 *
 *         return (
 *           <div>
 *             {isLoading && <span>Loading...</span>}
 *             {gift_card && <span>{gift_card.value}</span>}
 *             {isError && <span>Gift Card does not exist</span>}
 *           </div>
 *         )
 *       }
 *
 *       export default GiftCard
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl '{backend_url}/store/gift-cards/{code}'
 * tags:
 *   - Gift Cards
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/StoreGiftCardsRes"
 *   "400":
 *     $ref: "#/components/responses/400_error"
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
  const { code } = req.params

  try {
    const giftCardService: GiftCardService =
      req.scope.resolve("giftCardService")
    const giftCard = await giftCardService.retrieveByCode(code, {
      select: defaultStoreGiftCardFields,
      relations: defaultStoreGiftCardRelations,
    })

    res.json({ gift_card: giftCard })
  } catch (error) {
    const logger: Logger = req.scope.resolve("logger")
    logger.log(error)
    throw error
  }
}
