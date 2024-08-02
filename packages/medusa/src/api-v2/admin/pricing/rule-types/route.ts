import { createPricingRuleTypesWorkflow } from "@ninjajs/core-flows"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"
import {
  AdminCreatePricingRuleTypeType,
  AdminGetPricingRuleTypesParamsType,
} from "../validators"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"
import { refetchRuleType } from "../helpers"

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminGetPricingRuleTypesParamsType>,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "rule_type",
    variables: {
      filters: req.filterableFields,
      ...req.remoteQueryConfig.pagination,
    },
    fields: req.remoteQueryConfig.fields,
  })

  const { rows: rule_types, metadata } = await remoteQuery(queryObject)

  res.json({
    rule_types: rule_types,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminCreatePricingRuleTypeType>,
  res: NinjaResponse
) => {
  const workflow = createPricingRuleTypesWorkflow(req.scope)
  const ruleTypesData = [req.validatedBody]

  const { result, errors } = await workflow.run({
    input: { data: ruleTypesData },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const ruleType = await refetchRuleType(
    result[0].id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({
    rule_type: ruleType,
  })
}
