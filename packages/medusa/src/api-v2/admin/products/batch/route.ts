import { batchProductsWorkflow } from "@ninjajs/core-flows"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"
import {
  AdminBatchUpdateProductType,
  AdminCreateProductType,
} from "../validators"
import { BatchMethodRequest } from "@ninjajs/types"
import { refetchBatchProducts, remapProductResponse } from "../helpers"

export const POST = async (
  req: AuthenticatedNinjaRequest<
    BatchMethodRequest<AdminCreateProductType, AdminBatchUpdateProductType>
  >,
  res: NinjaResponse
) => {
  // TODO: Fix types
  const input = req.validatedBody as any

  const { result, errors } = await batchProductsWorkflow(req.scope).run({
    input,
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const batchResults = await refetchBatchProducts(
    result,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({
    created: batchResults.created.map(remapProductResponse),
    updated: batchResults.updated.map(remapProductResponse),
    deleted: batchResults.deleted,
  })
}
