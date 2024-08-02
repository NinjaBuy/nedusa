import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../../types/routing"

import { createProductVariantsWorkflow } from "@ninjajs/core-flows"
import {
  remoteQueryObjectFromString,
  ContainerRegistrationKeys,
} from "@ninjajs/utils"
import {
  refetchProduct,
  remapKeysForVariant,
  remapProductResponse,
  remapVariantResponse,
} from "../../helpers"
import { AdminCreateProductVariantType } from "../../validators"

export const GET = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const productId = req.params.id

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "variant",
    variables: {
      filters: { ...req.filterableFields, product_id: productId },
      order: req.listConfig.order,
      skip: req.listConfig.skip,
      take: req.listConfig.take,
    },
    fields: remapKeysForVariant(req.remoteQueryConfig.fields ?? []),
  })

  const { rows: variants, metadata } = await remoteQuery(queryObject)

  res.json({
    variants: variants.map(remapVariantResponse),
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminCreateProductVariantType>,
  res: NinjaResponse
) => {
  const productId = req.params.id
  const input = [
    {
      ...req.validatedBody,
      product_id: productId,
    },
  ]

  const { result, errors } = await createProductVariantsWorkflow(req.scope).run(
    {
      input: { product_variants: input },
      throwOnError: false,
    }
  )

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
