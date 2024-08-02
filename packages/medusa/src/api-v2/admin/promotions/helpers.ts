import { BatchMethodResponse } from "@ninjajs/types"
import { PromotionRuleDTO, NinjaContainer } from "@ninjajs/types"
import {
  promiseAll,
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"

export const refetchPromotion = async (
  promotionId: string,
  scope: NinjaContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "promotion",
    variables: {
      filters: { id: promotionId },
    },
    fields: fields,
  })

  const promotions = await remoteQuery(queryObject)
  return promotions[0]
}

export const refetchBatchRules = async (
  batchResult: BatchMethodResponse<PromotionRuleDTO>,
  scope: NinjaContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  let created = Promise.resolve<PromotionRuleDTO[]>([])
  let updated = Promise.resolve<PromotionRuleDTO[]>([])

  if (batchResult.created.length) {
    const createdQuery = remoteQueryObjectFromString({
      entryPoint: "promotion_rule",
      variables: {
        filters: { id: batchResult.created.map((p) => p.id) },
      },
      fields: fields,
    })

    created = remoteQuery(createdQuery)
  }

  if (batchResult.updated.length) {
    const updatedQuery = remoteQueryObjectFromString({
      entryPoint: "promotion_rule",
      variables: {
        filters: { id: batchResult.updated.map((p) => p.id) },
      },
      fields: fields,
    })

    updated = remoteQuery(updatedQuery)
  }

  const [createdRes, updatedRes] = await promiseAll([created, updated])
  return {
    created: createdRes,
    updated: updatedRes,
    deleted: batchResult.deleted,
  }
}
