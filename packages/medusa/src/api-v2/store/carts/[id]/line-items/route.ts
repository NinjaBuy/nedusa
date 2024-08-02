import { addToCartWorkflow } from "@ninjajs/core-flows"
import { NinjaRequest, NinjaResponse } from "../../../../../types/routing"
import { refetchCart } from "../../helpers"
import { StoreAddCartLineItemType } from "../../validators"

export const POST = async (
  req: NinjaRequest<StoreAddCartLineItemType>,
  res: NinjaResponse
) => {
  const cart = await refetchCart(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  const workflowInput = {
    items: [req.validatedBody],
    cart,
  }

  const { errors } = await addToCartWorkflow(req.scope).run({
    input: workflowInput,
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const updatedCart = await refetchCart(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ cart: updatedCart })
}
