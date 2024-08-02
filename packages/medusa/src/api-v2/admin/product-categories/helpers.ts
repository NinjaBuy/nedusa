import { NinjaContainer } from "@ninjajs/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"

export const refetchCategory = async (
  categoryId: string,
  scope: NinjaContainer,
  fields: string[],
  filterableFields: Record<string, any> = {}
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "product_category",
    variables: {
      filters: { ...filterableFields, id: categoryId },
    },
    fields: fields,
  })

  const categorys = await remoteQuery(queryObject)
  return categorys[0]
}
