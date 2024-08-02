import { deleteUsersWorkflow, updateUsersWorkflow } from "@ninjajs/core-flows"
import { UpdateUserDTO } from "@ninjajs/types"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"

import {
  ContainerRegistrationKeys,
  NinjaError,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"
import { AdminUpdateUserType } from "../validators"
import { refetchUser } from "../helpers"

// Get user
export const GET = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const { id } = req.params

  const query = remoteQueryObjectFromString({
    entryPoint: "user",
    variables: { id },
    fields: req.remoteQueryConfig.fields,
  })

  const [user] = await remoteQuery(query)
  if (!user) {
    throw new NinjaError(
      NinjaError.Types.NOT_FOUND,
      `User with id: ${id} was not found`
    )
  }

  res.status(200).json({ user })
}

// update user
export const POST = async (
  req: AuthenticatedNinjaRequest<AdminUpdateUserType>,
  res: NinjaResponse
) => {
  const workflow = updateUsersWorkflow(req.scope)

  const input = {
    updates: [
      {
        id: req.params.id,
        ...req.validatedBody,
      } as UpdateUserDTO,
    ],
  }

  const { result } = await workflow.run({ input })

  const user = await refetchUser(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ user })
}

// delete user
export const DELETE = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const { id } = req.params
  const workflow = deleteUsersWorkflow(req.scope)

  const { errors } = await workflow.run({
    input: { ids: [id] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({
    id,
    object: "user",
    deleted: true,
  })
}
