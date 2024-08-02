import { batchProductVariantsWorkflow } from "@ninjajs/core-flows"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../../../types/routing"
import {
  AdminBatchUpdateProductVariantType,
  AdminCreateProductType,
} from "../../../validators"
import { BatchMethodRequest } from "@ninjajs/types"
import { refetchBatchVariants, remapVariantResponse } from "../../../helpers"

export const POST = async (
  req: AuthenticatedNinjaRequest<
    BatchMethodRequest<
      AdminCreateProductType,
      AdminBatchUpdateProductVariantType
    >
  >,
  res: NinjaResponse
) => {
  const productId = req.params.id

  const normalizedInput = {
    create: req.validatedBody.create?.map((c) => ({
      ...c,
      product_id: productId,
    })),
    update: req.validatedBody.update?.map((u) => ({
      ...u,
      product_id: productId,
    })),
    delete: req.validatedBody.delete,
    // TODO: Fix types
  } as any

  const { result, errors } = await batchProductVariantsWorkflow(req.scope).run({
    input: normalizedInput,
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const batchResults = await refetchBatchVariants(
    result,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({
    created: batchResults.created.map(remapVariantResponse),
    updated: batchResults.updated.map(remapVariantResponse),
    deleted: batchResults.deleted,
  })
}
