import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"
import {
  deleteCollectionsWorkflow,
  updateCollectionsWorkflow,
} from "@ninjajs/core-flows"

import { AdminUpdateCollectionType } from "../validators"
import { refetchCollection } from "../helpers"

export const GET = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const collection = await refetchCollection(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ collection })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminUpdateCollectionType>,
  res: NinjaResponse
) => {
  const { result, errors } = await updateCollectionsWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody,
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

  res.status(200).json({ collection })
}

export const DELETE = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const id = req.params.id

  const { errors } = await deleteCollectionsWorkflow(req.scope).run({
    input: { ids: [id] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({
    id,
    object: "collection",
    deleted: true,
  })
}
