import { deleteTaxRateRulesWorkflow } from "@ninjajs/core-flows"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../../../types/routing"
import { refetchTaxRate } from "../../../helpers"

export const DELETE = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const { errors } = await deleteTaxRateRulesWorkflow(req.scope).run({
    input: { ids: [req.params.rule_id] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const taxRate = await refetchTaxRate(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({
    id: req.params.rule_id,
    object: "tax_rate_rule",
    deleted: true,
    parent: taxRate,
  })
}
