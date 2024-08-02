import {
  deleteApiKeysWorkflow,
  updateApiKeysWorkflow,
} from "@ninjajs/core-flows"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"

import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"
import { refetchApiKey } from "../helpers"
import { AdminUpdateApiKeyType } from "../validators"

export const GET = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const apiKey = await refetchApiKey(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ api_key: apiKey })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminUpdateApiKeyType>,
  res: NinjaResponse
) => {
  const { result, errors } = await updateApiKeysWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody,
    },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const apiKey = await refetchApiKey(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ api_key: apiKey })
}

export const DELETE = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const id = req.params.id

  const { errors } = await deleteApiKeysWorkflow(req.scope).run({
    input: { ids: [id] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({
    id,
    object: "api_key",
    deleted: true,
  })
}
