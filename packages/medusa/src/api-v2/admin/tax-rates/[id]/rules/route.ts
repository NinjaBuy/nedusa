import { createTaxRateRulesWorkflow } from "@ninjajs/core-flows"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../../types/routing"
import { AdminCreateTaxRateRuleType } from "../../validators"
import { refetchTaxRate } from "../../helpers"

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminCreateTaxRateRuleType>,
  res: NinjaResponse
) => {
  const { errors } = await createTaxRateRulesWorkflow(req.scope).run({
    input: {
      rules: [
        {
          ...req.validatedBody,
          tax_rate_id: req.params.id,
          created_by: req.auth.actor_id,
        },
      ],
    },
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
  res.status(200).json({ tax_rate: taxRate })
}
