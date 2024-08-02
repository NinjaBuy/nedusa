import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"
import { NinjaRequest, NinjaResponse } from "../../../types/routing"

import { createStockLocationsWorkflow } from "@ninjajs/core-flows"
import {
  AdminCreateStockLocationType,
  AdminGetStockLocationsParamsType,
} from "./validators"
import { refetchStockLocation } from "./helpers"

// Create stock location
export const POST = async (
  req: NinjaRequest<AdminCreateStockLocationType>,
  res: NinjaResponse
) => {
  const { result } = await createStockLocationsWorkflow(req.scope).run({
    input: { locations: [req.validatedBody] },
  })

  const stockLocation = await refetchStockLocation(
    result[0].id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ stock_location: stockLocation })
}

export const GET = async (
  req: NinjaRequest<AdminGetStockLocationsParamsType>,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const { rows: stock_locations, metadata } = await remoteQuery(
    remoteQueryObjectFromString({
      entryPoint: "stock_locations",
      variables: {
        filters: req.filterableFields,
        ...req.remoteQueryConfig.pagination,
      },
      fields: req.remoteQueryConfig.fields,
    })
  )

  res.status(200).json({
    stock_locations,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
