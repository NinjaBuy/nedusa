import { updateProductCategoryWorkflow } from "@ninjajs/core-flows"
import { AdminProductCategoryResponse } from "@ninjajs/types"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"
import { refetchCategory } from "../helpers"
import {
  AdminProductCategoryParamsType,
  AdminUpdateProductCategoryType,
} from "../validators"

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminProductCategoryParamsType>,
  res: NinjaResponse<AdminProductCategoryResponse>
) => {
  const category = await refetchCategory(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields,
    req.filterableFields
  )

  res.json({ product_category: category })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminUpdateProductCategoryType>,
  res: NinjaResponse<AdminProductCategoryResponse>
) => {
  const { id } = req.params

  // TODO: Should be converted to bulk update
  const { errors } = await updateProductCategoryWorkflow(req.scope).run({
    input: { id, data: req.validatedBody },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const category = await refetchCategory(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields,
    req.filterableFields
  )

  res.status(200).json({ product_category: category })
}
