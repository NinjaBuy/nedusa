import { createProductCategoryWorkflow } from "@ninjajs/core-flows"
import {
  AdminProductCategoryListResponse,
  AdminProductCategoryResponse,
} from "@ninjajs/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../types/routing"
import { refetchCategory } from "./helpers"
import {
  AdminCreateProductCategoryType,
  AdminProductCategoriesParamsType,
} from "./validators"

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminProductCategoriesParamsType>,
  res: NinjaResponse<AdminProductCategoryListResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "product_category",
    variables: {
      filters: req.filterableFields,
      ...req.remoteQueryConfig.pagination,
    },
    fields: req.remoteQueryConfig.fields,
  })

  const { rows: product_categories, metadata } = await remoteQuery(queryObject)

  res.json({
    product_categories,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminCreateProductCategoryType>,
  res: NinjaResponse<AdminProductCategoryResponse>
) => {
  const { result, errors } = await createProductCategoryWorkflow(req.scope).run(
    {
      input: { product_category: req.validatedBody },
      throwOnError: false,
    }
  )

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const category = await refetchCategory(
    result.id,
    req.scope,
    req.remoteQueryConfig.fields,
    req.filterableFields
  )

  res.status(200).json({ product_category: category })
}
