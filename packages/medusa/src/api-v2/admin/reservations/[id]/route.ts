import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"
import {
  AdminGetReservationParamsType,
  AdminUpdateReservationType,
} from "../validators"
import { NinjaError } from "@ninjajs/utils"
import { deleteReservationsWorkflow } from "@ninjajs/core-flows"
import { updateReservationsWorkflow } from "@ninjajs/core-flows"
import { refetchReservation } from "../helpers"

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminGetReservationParamsType>,
  res: NinjaResponse
) => {
  const { id } = req.params

  const reservation = await refetchReservation(
    id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  if (!reservation) {
    throw new NinjaError(
      NinjaError.Types.NOT_FOUND,
      `Reservation with id: ${id} was not found`
    )
  }

  res.status(200).json({ reservation })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminUpdateReservationType>,
  res: NinjaResponse
) => {
  const { id } = req.params
  const { errors } = await updateReservationsWorkflow(req.scope).run({
    input: {
      updates: [{ ...req.validatedBody, id }],
    },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const reservation = await refetchReservation(
    id,
    req.scope,
    req.remoteQueryConfig.fields
  )
  res.status(200).json({ reservation })
}

export const DELETE = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const id = req.params.id

  const { errors } = await deleteReservationsWorkflow(req.scope).run({
    input: { ids: [id] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({
    id,
    object: "reservation",
    deleted: true,
  })
}
