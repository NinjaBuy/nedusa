import { NinjaRequest, NinjaResponse } from "../../../../types/routing"

import {
  deleteStockLocationsWorkflow,
  updateStockLocationsWorkflow,
} from "@ninjajs/core-flows"
import { NinjaError } from "@ninjajs/utils"
import {
  AdminGetStockLocationParamsType,
  AdminUpdateStockLocationType,
} from "../validators"
import { refetchStockLocation } from "../helpers"

export const POST = async (
  req: NinjaRequest<AdminUpdateStockLocationType>,
  res: NinjaResponse
) => {
  const { id } = req.params
  await updateStockLocationsWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody,
    },
  })

  const stockLocation = await refetchStockLocation(
    id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({
    stock_location: stockLocation,
  })
}

export const GET = async (
  req: NinjaRequest<AdminGetStockLocationParamsType>,
  res: NinjaResponse
) => {
  const { id } = req.params

  const stockLocation = await refetchStockLocation(
    id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  if (!stockLocation) {
    throw new NinjaError(
      NinjaError.Types.NOT_FOUND,
      `Stock location with id: ${id} was not found`
    )
  }

  res.status(200).json({ stock_location: stockLocation })
}

export const DELETE = async (req: NinjaRequest, res: NinjaResponse) => {
  const { id } = req.params

  const { errors } = await deleteStockLocationsWorkflow(req.scope).run({
    input: { ids: [id] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({
    id,
    object: "stock_location",
    deleted: true,
  })
}
