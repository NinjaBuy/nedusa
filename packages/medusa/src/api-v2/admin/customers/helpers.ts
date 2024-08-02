import { NinjaContainer } from "@ninjajs/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"

export const refetchCustomer = async (
  customerId: string,
  scope: NinjaContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "customer",
    variables: {
      filters: { id: customerId },
    },
    fields: fields,
  })

  const customers = await remoteQuery(queryObject)
  return customers[0]
}
