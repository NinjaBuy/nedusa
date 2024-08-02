import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../../types/routing"

import { createProductOptionsWorkflow } from "@ninjajs/core-flows"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"
import { refetchProduct, remapProductResponse } from "../../helpers"
import { AdminCreateProductOptionType } from "../../validators"

export const GET = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const productId = req.params.id

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "product_option",
    variables: {
      filters: { ...req.filterableFields, product_id: productId },
      order: req.listConfig.order,
      skip: req.listConfig.skip,
      take: req.listConfig.take,
    },
    fields: req.remoteQueryConfig.fields,
  })

  const { rows: product_options, metadata } = await remoteQuery(queryObject)

  res.json({
    product_options,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminCreateProductOptionType>,
  res: NinjaResponse
) => {
  const productId = req.params.id
  const input = [
    {
      ...req.validatedBody,
      product_id: productId,
    },
  ]

  const { result, errors } = await createProductOptionsWorkflow(req.scope).run({
    input: { product_options: input },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const product = await refetchProduct(
    productId,
    req.scope,
    req.remoteQueryConfig.fields
  )
  res.status(200).json({ product: remapProductResponse(product) })
}
