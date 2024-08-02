import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../types/routing"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"

import { createReservationsWorkflow } from "@ninjajs/core-flows"
import {
  AdminCreateReservationType,
  AdminGetReservationsParamsType,
} from "./validators"
import { refetchReservation } from "./helpers"

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminGetReservationsParamsType>,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "reservation",
    variables: {
      filters: req.filterableFields,
      ...req.remoteQueryConfig.pagination,
    },
    fields: req.remoteQueryConfig.fields,
  })

  const { rows: reservations, metadata } = await remoteQuery(queryObject)

  res.json({
    reservations,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminCreateReservationType>,
  res: NinjaResponse
) => {
  const input = [req.validatedBody]

  const { result, errors } = await createReservationsWorkflow(req.scope).run({
    input: { reservations: input },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const reservation = await refetchReservation(
    result[0].id,
    req.scope,
    req.remoteQueryConfig.fields
  )
  res.status(200).json({ reservation })
}
