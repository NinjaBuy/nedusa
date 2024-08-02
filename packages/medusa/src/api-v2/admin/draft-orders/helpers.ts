import { NinjaContainer } from "@ninjajs/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"

export const refetchOrder = async (
  orderId: string,
  scope: NinjaContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "order",
    variables: {
      filters: { id: orderId },
    },
    fields: fields,
  })

  const orders = await remoteQuery(queryObject)
  return orders[0]
}
