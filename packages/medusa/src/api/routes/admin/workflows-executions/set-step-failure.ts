import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { TransactionHandlerType, isDefined } from "@ninjajs/utils"
import { IWorkflowEngineService, StepResponse } from "@ninjajs/workflows-sdk"
import { NinjaRequest, NinjaResponse } from "../../../../types/routing"
import { AdminPostWorkflowsAsyncResponseReq } from "./validators"

export default async (req: NinjaRequest, res: NinjaResponse) => {
  const workflowEngineService: IWorkflowEngineService = req.scope.resolve(
    ModuleRegistrationName.WORKFLOW_ENGINE
  )

  const { id: workflow_id } = req.params

  const body = req.validatedBody as AdminPostWorkflowsAsyncResponseReq

  const { transaction_id, step_id } = body

  const compensateInput = body.compensate_input
  const stepResponse = isDefined(body.response)
    ? new StepResponse(body.response, compensateInput)
    : undefined
  const stepAction = body.action || TransactionHandlerType.INVOKE

  await workflowEngineService.setStepFailure({
    idempotencyKey: {
      action: stepAction,
      transactionId: transaction_id,
      stepId: step_id,
      workflowId: workflow_id,
    },
    stepResponse,
    options: {
      container: req.scope,
      context: {
        requestId: req.requestId,
      },
    },
  })

  return res.status(200).json({ success: true })
}
