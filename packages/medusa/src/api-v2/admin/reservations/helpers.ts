import { NinjaContainer } from "@ninjajs/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"

export const refetchReservation = async (
  reservationId: string,
  scope: NinjaContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "reservation",
    variables: {
      filters: { id: reservationId },
    },
    fields: fields,
  })

  const reservations = await remoteQuery(queryObject)
  return reservations[0]
}
