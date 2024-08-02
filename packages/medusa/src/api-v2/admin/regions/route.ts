import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../types/routing"
import { createRegionsWorkflow } from "@ninjajs/core-flows"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"
import { AdminCreateRegionType, AdminGetRegionsParamsType } from "./validators"
import { refetchRegion } from "./helpers"

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminGetRegionsParamsType>,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "region",
    variables: {
      filters: req.filterableFields,
      ...req.remoteQueryConfig.pagination,
    },
    fields: req.remoteQueryConfig.fields,
  })

  const { rows: regions, metadata } = await remoteQuery(queryObject)

  res.json({
    regions,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminCreateRegionType>,
  res: NinjaResponse
) => {
  const input = [req.validatedBody]

  const { result, errors } = await createRegionsWorkflow(req.scope).run({
    input: { regions: input },
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
