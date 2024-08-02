import { createShipmentWorkflow } from "@ninjajs/core-flows"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../../types/routing"
import { refetchFulfillment } from "../../helpers"
import { AdminCreateShipmentType } from "../../validators"

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminCreateShipmentType>,
  res: NinjaResponse
) => {
  const { id } = req.params

  const { errors } = await createShipmentWorkflow(req.scope).run({
    input: { id, ...req.validatedBody },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const fulfillment = await refetchFulfillment(
    id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ fulfillment })
}
