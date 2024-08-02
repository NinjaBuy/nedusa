import { NinjaContainer } from "@ninjajs/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"

export const refetchProductType = async (
  productTypeId: string,
  scope: NinjaContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "product_type",
    variables: {
      filters: { id: productTypeId },
    },
    fields: fields,
  })

  const productTypes = await remoteQuery(queryObject)
  return productTypes[0]
}
