import { createFulfillmentWorkflow } from "@ninjajs/core-flows"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../types/routing"
import { refetchFulfillment } from "./helpers"
import { AdminCreateFulfillmentType } from "./validators"

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminCreateFulfillmentType>,
  res: NinjaResponse
) => {
  const { result: fullfillment, errors } = await createFulfillmentWorkflow(
    req.scope
  ).run({
    input: req.validatedBody,
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const fulfillment = await refetchFulfillment(
    fullfillment.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ fulfillment })
}
