import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../../../types/routing"
import { BatchMethodRequest } from "@ninjajs/types"
import {
  AdminCreateShippingOptionRuleType,
  AdminUpdateShippingOptionRuleType,
} from "../../../validators"
import { refetchBatchRules } from "../../../helpers"
import { batchShippingOptionRulesWorkflow } from "@ninjajs/core-flows"

export const POST = async (
  req: AuthenticatedNinjaRequest<
    BatchMethodRequest<
      AdminCreateShippingOptionRuleType,
      AdminUpdateShippingOptionRuleType
    >
  >,
  res: NinjaResponse
) => {
  const id = req.params.id
  const { result, errors } = await batchShippingOptionRulesWorkflow(
    req.scope
  ).run({
    input: {
      create: req.validatedBody.create?.map((c) => ({
        ...c,
        shipping_option_id: id,
      })),
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
