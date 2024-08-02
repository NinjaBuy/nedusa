import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../../types/routing"
import {
  IWorkflowEngineService,
  WorkflowOrchestratorTypes,
} from "@ninjajs/workflows-sdk"

import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { AdminCreateWorkflowsRunType } from "../../validators"

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminCreateWorkflowsRunType>,
  res: NinjaResponse
) => {
  const workflowEngineService: IWorkflowEngineService = req.scope.resolve(
    ModuleRegistrationName.WORKFLOW_ENGINE
  )

  const { workflow_id } = req.params

  const { transaction_id, input } = req.validatedBody

  const options = {
    transactionId: transaction_id,
    input,
    context: {
      requestId: req.requestId,
    },
    throwOnError: false,
  } as WorkflowOrchestratorTypes.WorkflowOrchestratorRunDTO

  const { acknowledgement } = await workflowEngineService.run(
    workflow_id,
    options
  )

  return res.status(200).json({ acknowledgement })
}
