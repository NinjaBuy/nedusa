import { createTaxRegionsWorkflow } from "@ninjajs/core-flows"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../types/routing"
import {
  AdminCreateTaxRegionType,
  AdminGetTaxRegionsParamsType,
} from "./validators"
import { refetchTaxRegion } from "./helpers"

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminCreateTaxRegionType>,
  res: NinjaResponse
) => {
  const { result, errors } = await createTaxRegionsWorkflow(req.scope).run({
    input: [
      {
        ...req.validatedBody,
        created_by: req.auth.actor_id,
      },
    ],
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const taxRegion = await refetchTaxRegion(
    result[0].id,
    req.scope,
    req.remoteQueryConfig.fields
  )
  res.status(200).json({ tax_region: taxRegion })
}

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminGetTaxRegionsParamsType>,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const { rows: tax_regions, metadata } = await remoteQuery(
    remoteQueryObjectFromString({
      entryPoint: "tax_regions",
      variables: {
        filters: req.filterableFields,
        ...req.remoteQueryConfig.pagination,
      },
      fields: req.remoteQueryConfig.fields,
    })
  )

  res.status(200).json({
    tax_regions,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
