import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"
import { NinjaRequest, NinjaResponse } from "../../../../../types/routing"

import { createInventoryLevelsWorkflow } from "@ninjajs/core-flows"
import {
  AdminCreateInventoryLocationLevelType,
  AdminGetInventoryLocationLevelsParamsType,
} from "../../validators"
import { refetchInventoryItem } from "../../helpers"

export const POST = async (
  req: NinjaRequest<AdminCreateInventoryLocationLevelType>,
  res: NinjaResponse
) => {
  const { id } = req.params

  const workflow = createInventoryLevelsWorkflow(req.scope)
  const { errors } = await workflow.run({
    input: {
      inventory_levels: [
        {
          ...req.validatedBody,
          inventory_item_id: id,
        },
      ],
    },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const inventoryItem = await refetchInventoryItem(
    id,
    req.scope,
    req.remoteQueryConfig.fields
  )
  res.status(200).json({ inventory_item: inventoryItem })
}

export const GET = async (
  req: NinjaRequest<AdminGetInventoryLocationLevelsParamsType>,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const query = remoteQueryObjectFromString({
    entryPoint: "inventory_levels",
    variables: {
      filters: req.filterableFields,
      ...req.remoteQueryConfig.pagination,
    },
    fields: req.remoteQueryConfig.fields,
  })

  const { rows: inventory_levels, metadata } = await remoteQuery(query)

  res.status(200).json({
    inventory_levels,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
