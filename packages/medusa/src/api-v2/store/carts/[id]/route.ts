import { updateCartWorkflow } from "@ninjajs/core-flows"
import { UpdateCartDataDTO } from "@ninjajs/types"

import { NinjaRequest, NinjaResponse } from "../../../../types/routing"
import { refetchCart } from "../helpers"

export const GET = async (req: NinjaRequest, res: NinjaResponse) => {
  const cart = await refetchCart(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.json({ cart })
}

export const POST = async (
  req: NinjaRequest<UpdateCartDataDTO>,
  res: NinjaResponse
) => {
  const workflow = updateCartWorkflow(req.scope)

  const { errors } = await workflow.run({
    input: {
      ...(req.validatedBody as UpdateCartDataDTO),
      id: req.params.id,
    },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const cart = await refetchCart(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ cart })
}
