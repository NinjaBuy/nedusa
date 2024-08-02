import { createUserAccountWorkflow } from "@ninjajs/core-flows"
import { CreateUserDTO } from "@ninjajs/types"
import {
  ContainerRegistrationKeys,
  NinjaError,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"
import jwt from "jsonwebtoken"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../types/routing"
import { refetchUser } from "./helpers"

export const GET = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const query = remoteQueryObjectFromString({
    entryPoint: "user",
    variables: {
      filters: req.filterableFields,
      ...req.remoteQueryConfig.pagination,
    },
    fields: req.remoteQueryConfig.fields,
  })

  const { rows: users, metadata } = await remoteQuery(query)
  res.status(200).json({
    users,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<CreateUserDTO>,
  res: NinjaResponse
) => {
  // If `actor_id` is present, the request carries authentication for an existing user
  if (req.auth.actor_id) {
    throw new NinjaError(
      NinjaError.Types.INVALID_DATA,
      "Request carries authentication for an existing user"
    )
  }

  const input = {
    input: {
      userData: req.validatedBody,
      authUserId: req.auth.auth_user_id,
    },
  }

  const { result } = await createUserAccountWorkflow(req.scope).run(input)
  const user = await refetchUser(
    req.auth.auth_user_id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  const { jwt_secret } = req.scope.resolve(
    ContainerRegistrationKeys.CONFIG_MODULE
  ).projectConfig
  const token = jwt.sign(user, jwt_secret)

  res.status(200).json({ user, token })
}
