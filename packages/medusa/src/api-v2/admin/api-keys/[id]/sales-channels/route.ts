import { ApiKeyType, NinjaError } from "@ninjajs/utils"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../../types/routing"
import { refetchApiKey } from "../../helpers"
import { LinkMethodRequest } from "@ninjajs/types/src"
import { linkSalesChannelsToApiKeyWorkflow } from "@ninjajs/core-flows"

export const POST = async (
  req: AuthenticatedNinjaRequest<LinkMethodRequest>,
  res: NinjaResponse
) => {
  const { add, remove } = req.validatedBody
  const apiKey = await refetchApiKey(req.params.id, req.scope, ["id", "type"])

  if (apiKey.type !== ApiKeyType.PUBLISHABLE) {
    throw new NinjaError(
      NinjaError.Types.INVALID_DATA,
      "Sales channels can only be associated with publishable API keys"
    )
  }

  const { errors } = await linkSalesChannelsToApiKeyWorkflow(req.scope).run({
    input: {
      id: req.params.id,
      add,
      remove,
    },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const updatedApiKey = await refetchApiKey(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ api_key: updatedApiKey })
}
