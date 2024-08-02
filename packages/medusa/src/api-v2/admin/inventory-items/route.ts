import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../types/routing"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"

import { createInventoryItemsWorkflow } from "@ninjajs/core-flows"
import {
  AdminCreateInventoryItemType,
  AdminGetInventoryItemsParamsType,
} from "./validators"
import { refetchInventoryItem } from "./helpers"

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminCreateInventoryItemType>,
  res: NinjaResponse
) => {
  const { result } = await createInventoryItemsWorkflow(req.scope).run({
    input: { items: [req.validatedBody] },
  })

  const inventoryItem = await refetchInventoryItem(
    result[0].id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ inventory_item: inventoryItem })
}

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminGetInventoryItemsParamsType>,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const query = remoteQueryObjectFromString({
    entryPoint: "inventory_items",
    variables: {
      filters: req.filterableFields,
      ...req.remoteQueryConfig.pagination,
    },
    fields: req.remoteQueryConfig.fields,
  })

  const { rows: inventory_items, metadata } = await remoteQuery({
    ...query,
  })

  res.status(200).json({
    inventory_items,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
