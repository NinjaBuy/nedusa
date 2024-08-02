import { batchPromotionRulesWorkflow } from "@ninjajs/core-flows"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../../../types/routing"
import { BatchMethodRequest } from "@ninjajs/types"
import {
  AdminCreatePromotionRuleType,
  AdminUpdatePromotionRuleType,
} from "../../../validators"
import { RuleType } from "@ninjajs/utils"
import { refetchBatchRules } from "../../../helpers"

export const POST = async (
  req: AuthenticatedNinjaRequest<
    BatchMethodRequest<
      AdminCreatePromotionRuleType,
      AdminUpdatePromotionRuleType
    >
  >,
  res: NinjaResponse
) => {
  const id = req.params.id
  const { result, errors } = await batchPromotionRulesWorkflow(req.scope).run({
    input: {
      id,
      rule_type: RuleType.BUY_RULES,
      create: req.validatedBody.create,
      update: req.validatedBody.update,
      delete: req.validatedBody.delete,
    },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const batchResults = await refetchBatchRules(
    result,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json(batchResults)
}
