import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import {
  AdminShippingProfileDeleteResponse,
  AdminShippingProfileResponse,
  IFulfillmentModuleService,
} from "@ninjajs/types"
import { deleteShippingProfileWorkflow } from "@ninjajs/core-flows"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"
import { AdminGetShippingProfileParamsType } from "../validators"
import { refetchShippingProfile } from "../helpers"

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminGetShippingProfileParamsType>,
  res: NinjaResponse<AdminShippingProfileResponse>
) => {
  const shippingProfile = await refetchShippingProfile(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ shipping_profile: shippingProfile })
}

export const DELETE = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse<AdminShippingProfileDeleteResponse>
) => {
  const { id } = req.params

  const fulfillmentModuleService = req.scope.resolve<IFulfillmentModuleService>(
    ModuleRegistrationName.FULFILLMENT
  )

  // Test if exists
  await fulfillmentModuleService.retrieveShippingProfile(id)

  const { errors } = await deleteShippingProfileWorkflow(req.scope).run({
    input: { ids: [id] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({
    id,
    object: "shipping_profile",
    deleted: true,
  })
}
