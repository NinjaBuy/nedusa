import { batchLinkProductsToCollectionWorkflow } from "@ninjajs/core-flows"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../../types/routing"
import { LinkMethodRequest } from "@ninjajs/types/src"
import { refetchCollection } from "../../helpers"

export const POST = async (
  req: AuthenticatedNinjaRequest<LinkMethodRequest>,
  res: NinjaResponse
) => {
  const id = req.params.id
  const { add = [], remove = [] } = req.validatedBody

  const workflow = batchLinkProductsToCollectionWorkflow(req.scope)
  const { result, errors } = await workflow.run({
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

  const collection = await refetchCollection(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({
    collection,
  })
}
