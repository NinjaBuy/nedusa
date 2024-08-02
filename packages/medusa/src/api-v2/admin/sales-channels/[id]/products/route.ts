import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../../types/routing"

import { LinkMethodRequest } from "@ninjajs/types/src"
import { refetchSalesChannel } from "../../helpers"
import { linkProductsToSalesChannelWorkflow } from "@ninjajs/core-flows"

export const POST = async (
  req: AuthenticatedNinjaRequest<LinkMethodRequest>,
  res: NinjaResponse
) => {
  const { id } = req.params
  const { add, remove } = req.validatedBody

  const workflow = linkProductsToSalesChannelWorkflow(req.scope)
  const { errors } = await workflow.run({
    input: {
      id,
      add,
      remove,
    },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const salesChannel = await refetchSalesChannel(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )
  res.status(200).json({ sales_channel: salesChannel })
}
