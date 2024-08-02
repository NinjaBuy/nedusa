import { NinjaError } from "@ninjajs/utils"
import { NinjaRequest, NinjaResponse } from "../../../../types/routing"
import {
  deleteInventoryItemWorkflow,
  updateInventoryItemsWorkflow,
} from "@ninjajs/core-flows"
import {
  AdminGetInventoryItemParamsType,
  AdminUpdateInventoryItemType,
} from "../validators"
import { refetchInventoryItem } from "../helpers"

export const GET = async (
  req: NinjaRequest<AdminGetInventoryItemParamsType>,
  res: NinjaResponse
) => {
  const { id } = req.params
  const inventoryItem = await refetchInventoryItem(
    id,
    req.scope,
    req.remoteQueryConfig.fields
  )
  if (!inventoryItem) {
    throw new NinjaError(
      NinjaError.Types.NOT_FOUND,
      `Inventory item with id: ${id} was not found`
    )
  }

  res.status(200).json({
    inventory_item: inventoryItem,
  })
}

// Update inventory item
export const POST = async (
  req: NinjaRequest<AdminUpdateInventoryItemType>,
  res: NinjaResponse
) => {
  const { id } = req.params

  await updateInventoryItemsWorkflow(req.scope).run({
    input: {
      updates: [{ id, ...req.validatedBody }],
    },
  })

  const inventoryItem = await refetchInventoryItem(
    id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({
    inventory_item: inventoryItem,
  })
}

export const DELETE = async (req: NinjaRequest, res: NinjaResponse) => {
  const id = req.params.id
  const deleteInventoryItems = deleteInventoryItemWorkflow(req.scope)

  const { errors } = await deleteInventoryItems.run({
    input: [id],
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({
    id,
    object: "inventory_item",
    deleted: true,
  })
}
