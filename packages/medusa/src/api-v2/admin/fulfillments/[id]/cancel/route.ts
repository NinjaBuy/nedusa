import { cancelFulfillmentWorkflow } from "@ninjajs/core-flows"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../../types/routing"
import { refetchFulfillment } from "../../helpers"
import { AdminCancelFulfillmentType } from "../../validators"

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminCancelFulfillmentType>,
  res: NinjaResponse
) => {
  const { id } = req.params
  const { errors } = await cancelFulfillmentWorkflow(req.scope).run({
    input: { id },
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
