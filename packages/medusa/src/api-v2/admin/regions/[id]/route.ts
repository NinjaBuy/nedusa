import {
  deleteRegionsWorkflow,
  updateRegionsWorkflow,
} from "@ninjajs/core-flows"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"
import { refetchRegion } from "../helpers"
import { AdminGetRegionParamsType, AdminUpdateRegionType } from "../validators"

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminGetRegionParamsType>,
  res: NinjaResponse
) => {
  const region = await refetchRegion(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )
  res.status(200).json({ region })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminUpdateRegionType>,
  res: NinjaResponse
) => {
  const { result, errors } = await updateRegionsWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody,
    },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const region = await refetchRegion(
    result[0].id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ region })
}

export const DELETE = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const id = req.params.id

  const { errors } = await deleteRegionsWorkflow(req.scope).run({
    input: { ids: [id] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({
    id,
    object: "region",
    deleted: true,
  })
}
