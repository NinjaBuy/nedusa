import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../types/routing"

import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"
import { createProductTypesWorkflow } from "@ninjajs/core-flows"
import { refetchProductType } from "./helpers"
import {
  AdminCreateProductTypeType,
  AdminGetProductTypesParamsType,
} from "./validators"

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminGetProductTypesParamsType>,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "product_type",
    variables: {
      filters: req.filterableFields,
      ...req.remoteQueryConfig.pagination,
    },
    fields: req.remoteQueryConfig.fields,
  })

  const { rows: product_types, metadata } = await remoteQuery(queryObject)

  res.json({
    product_types: product_types,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminCreateProductTypeType>,
  res: NinjaResponse
) => {
  const input = [req.validatedBody]

  const { result, errors } = await createProductTypesWorkflow(req.scope).run({
    input: { product_types: input },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const productType = await refetchProductType(
    result[0].id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ product_type: productType })
}
