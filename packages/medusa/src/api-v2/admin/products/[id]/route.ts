import {
  deleteProductsWorkflow,
  updateProductsWorkflow,
} from "@ninjajs/core-flows"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"

import { UpdateProductDTO } from "@ninjajs/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"
import {
  refetchProduct,
  remapKeysForProduct,
  remapProductResponse,
} from "../helpers"
import { AdminUpdateProductType } from "../validators"

export const GET = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const variables = { id: req.params.id }

  const selectFields = remapKeysForProduct(req.remoteQueryConfig.fields ?? [])
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "product",
    variables,
    fields: selectFields,
  })

  const [product] = await remoteQuery(queryObject)

  res.status(200).json({ product: remapProductResponse(product) })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminUpdateProductType>,
  res: NinjaResponse
) => {
  const { result, errors } = await updateProductsWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody as UpdateProductDTO,
    },
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

export const DELETE = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const id = req.params.id

  const { errors } = await deleteProductsWorkflow(req.scope).run({
    input: { ids: [id] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({
    id,
    object: "product",
    deleted: true,
  })
}
