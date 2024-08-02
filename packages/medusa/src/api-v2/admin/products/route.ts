import { createProductsWorkflow } from "@ninjajs/core-flows"
import { CreateProductDTO } from "@ninjajs/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../types/routing"
import {
  refetchProduct,
  remapKeysForProduct,
  remapProductResponse,
} from "./helpers"
import {
  AdminCreateProductType,
  AdminGetProductsParamsType,
} from "./validators"

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminGetProductsParamsType>,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const selectFields = remapKeysForProduct(req.remoteQueryConfig.fields ?? [])

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "product",
    variables: {
      filters: req.filterableFields,
      ...req.remoteQueryConfig.pagination,
    },
    fields: selectFields,
  })

  const { rows: products, metadata } = await remoteQuery(queryObject)

  res.json({
    products: products.map(remapProductResponse),
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminCreateProductType>,
  res: NinjaResponse
) => {
  const input = [req.validatedBody as CreateProductDTO]

  const { result, errors } = await createProductsWorkflow(req.scope).run({
    input: { products: input },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const product = await refetchProduct(
    result[0].id,
    req.scope,
    req.remoteQueryConfig.fields
  )
  res.status(200).json({ product: remapProductResponse(product) })
}
