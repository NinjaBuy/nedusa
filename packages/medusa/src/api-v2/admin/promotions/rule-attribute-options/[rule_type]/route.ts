import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../../types/routing"
import { ruleAttributesMap, validateRuleType } from "../../utils"

export const GET = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const { rule_type: ruleType } = req.params

  validateRuleType(ruleType)

  const attributes = ruleAttributesMap[ruleType] || []

  res.json({
    attributes,
  })
}
