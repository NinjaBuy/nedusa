import { NinjaContainer } from "@ninjajs/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"

export const refetchCampaign = async (
  campaignId: string,
  scope: NinjaContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "campaign",
    variables: {
      filters: { id: campaignId },
    },
    fields: fields,
  })

  const campaigns = await remoteQuery(queryObject)
  return campaigns[0]
}
