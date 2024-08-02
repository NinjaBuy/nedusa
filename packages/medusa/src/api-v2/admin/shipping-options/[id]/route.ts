import {
  AdminShippingOptionDeleteResponse,
  AdminShippingOptionRetrieveResponse,
} from "@ninjajs/types"
import { AdminUpdateShippingOptionType } from "../validators"
import {
  deleteShippingOptionsWorkflow,
  updateShippingOptionsWorkflow,
} from "@ninjajs/core-flows"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"
import { refetchShippingOption } from "../helpers"

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminUpdateShippingOptionType>,
  res: NinjaResponse<AdminShippingOptionRetrieveResponse>
) => {
  const shippingOptionPayload = req.validatedBody

  const workflow = updateShippingOptionsWorkflow(req.scope)

  const { result, errors } = await workflow.run({
    input: [shippingOptionPayload],
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const shippingOption = await refetchShippingOption(
    result[0].id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ shipping_option: shippingOption })
}

export const DELETE = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse<AdminShippingOptionDeleteResponse>
) => {
  const shippingOptionId = req.params.id

  const workflow = deleteShippingOptionsWorkflow(req.scope)

  const { errors } = await workflow.run({
    input: { ids: [shippingOptionId] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res
    .status(200)
    .json({ id: shippingOptionId, object: "shipping_option", deleted: true })
}
