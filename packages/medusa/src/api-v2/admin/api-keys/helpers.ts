import { NinjaContainer } from "@ninjajs/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"

export const refetchApiKey = async (
  apiKeyId: string,
  scope: NinjaContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "api_key",
    variables: {
      filters: { id: apiKeyId },
    },
    fields: fields,
  })

  const apiKeys = await remoteQuery(queryObject)
  return apiKeys[0]
}
