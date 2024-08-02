import {
  deletePromotionsWorkflow,
  updatePromotionsWorkflow,
} from "@ninjajs/core-flows"
import { NinjaError } from "@ninjajs/utils"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"
import {
  AdminGetPromotionParamsType,
  AdminUpdatePromotionType,
} from "../validators"
import { ContainerRegistrationKeys } from "@ninjajs/utils"
import { remoteQueryObjectFromString } from "@ninjajs/utils"
import { refetchPromotion } from "../helpers"

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminGetPromotionParamsType>,
  res: NinjaResponse
) => {
  const idOrCode = req.params.id
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "promotion",
    variables: {
      filters: { $or: [{ id: idOrCode }, { code: idOrCode }] },
    },
    fields: req.remoteQueryConfig.fields,
  })

  const [promotion] = await remoteQuery(queryObject)
  if (!promotion) {
    throw new NinjaError(
      NinjaError.Types.NOT_FOUND,
      `Promotion with id or code: does-not-exist was not found`
    )
  }

  res.status(200).json({ promotion })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminUpdatePromotionType>,
  res: NinjaResponse
) => {
  const updatePromotions = updatePromotionsWorkflow(req.scope)
  const promotionsData = [
    {
      id: req.params.id,
      ...req.validatedBody,
    } as any,
  ]

  const { result, errors } = await updatePromotions.run({
    input: { promotionsData },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const promotion = await refetchPromotion(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ promotion })
}

export const DELETE = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const id = req.params.id
  const deletePromotions = deletePromotionsWorkflow(req.scope)

  const { errors } = await deletePromotions.run({
    input: { ids: [id] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({
    id,
    object: "promotion",
    deleted: true,
  })
}
