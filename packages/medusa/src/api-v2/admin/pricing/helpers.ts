import { NinjaContainer } from "@ninjajs/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"

export const refetchRuleType = async (
  ruleTypeId: string,
  scope: NinjaContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "rule_type",
    variables: {
      filters: { id: ruleTypeId },
    },
    fields: fields,
  })

  const ruleTypes = await remoteQuery(queryObject)
  return ruleTypes[0]
}
