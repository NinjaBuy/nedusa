import { IInventoryService } from "@ninjajs/types"
import { NinjaError } from "@ninjajs/utils"
import { LineItemService } from "../../../../../services"

export const validateUpdateReservationQuantity = async (
  lineItemId: string,
  quantityUpdate: number,
  context: {
    lineItemService: LineItemService
    inventoryService: IInventoryService
  }
) => {
  const { lineItemService, inventoryService } = context
  const [reservationItems] = await inventoryService.listReservationItems({
    line_item_id: lineItemId,
  })

  const totalQuantity = reservationItems.reduce(
    (acc, cur) => acc + cur.quantity,
    quantityUpdate
  )

  const lineItem = await lineItemService.retrieve(lineItemId)

  if (totalQuantity > lineItem.quantity - (lineItem.fulfilled_quantity || 0)) {
    throw new NinjaError(
      NinjaError.Types.INVALID_DATA,
      "The reservation quantity cannot be greater than the unfulfilled line item quantity"
    )
  }
}
