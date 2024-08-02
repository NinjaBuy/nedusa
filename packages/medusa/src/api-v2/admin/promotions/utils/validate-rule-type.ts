import { NinjaError, RuleType } from "@ninjajs/utils"

const validRuleTypes: string[] = Object.values(RuleType)

export function validateRuleType(ruleType: string) {
  const underscorizedRuleType = ruleType.split("-").join("_")

  if (!validRuleTypes.includes(underscorizedRuleType)) {
    throw new NinjaError(
      NinjaError.Types.INVALID_DATA,
      `Invalid param rule_type (${ruleType})`
    )
  }
}
