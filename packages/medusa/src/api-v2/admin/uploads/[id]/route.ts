import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"
import { deleteFilesWorkflow } from "@ninjajs/core-flows"
import { ContainerRegistrationKeys, NinjaError } from "@ninjajs/utils"
import { remoteQueryObjectFromString } from "@ninjajs/utils"

export const GET = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const variables = { id: req.params.id }

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "file",
    variables,
    fields: req.remoteQueryConfig.fields,
  })

  const [file] = await remoteQuery(queryObject)
  if (!file) {
    throw new NinjaError(
      NinjaError.Types.NOT_FOUND,
      `File with id: ${req.params.id} not found`
    )
  }

  res.status(200).json({ file })
}

export const DELETE = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const id = req.params.id

  const { errors } = await deleteFilesWorkflow(req.scope).run({
    input: { ids: [id] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({
    id,
    object: "file",
    deleted: true,
  })
}
