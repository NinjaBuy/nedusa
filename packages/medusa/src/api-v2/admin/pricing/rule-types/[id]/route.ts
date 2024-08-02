import {
  deletePricingRuleTypesWorkflow,
  updatePricingRuleTypesWorkflow,
} from "@ninjajs/core-flows"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../../types/routing"
import {
  AdminGetPricingRuleTypeParamsType,
  AdminUpdatePricingRuleTypeType,
} from "../../validators"
import { refetchRuleType } from "../../helpers"
import { NinjaError } from "@ninjajs/utils"

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminGetPricingRuleTypeParamsType>,
  res: NinjaResponse
) => {
  const ruleType = await refetchRuleType(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  if (!ruleType) {
    throw new NinjaError(
      NinjaError.Types.NOT_FOUND,
      `RuleType with id: ${req.params.id} was not found`
    )
  }

  res.status(200).json({ rule_type: ruleType })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminUpdatePricingRuleTypeType>,
  res: NinjaResponse
) => {
  const workflow = updatePricingRuleTypesWorkflow(req.scope)
  const { result, errors } = await workflow.run({
    input: {
      data: [{ ...req.validatedBody, id: req.params.id }],
    },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const ruleType = await refetchRuleType(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({
    rule_type: ruleType,
  })
}

export const DELETE = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const id = req.params.id
  const workflow = deletePricingRuleTypesWorkflow(req.scope)

  const { errors } = await workflow.run({
    input: { ids: [id] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({
    id,
    object: "rule_type",
    deleted: true,
  })
}
