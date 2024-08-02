import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { IWorkflowEngineService } from "@ninjajs/workflows-sdk"
import { NinjaRequest, NinjaResponse } from "../../../../types/routing"

export default async (req: NinjaRequest, res: NinjaResponse) => {
  const workflowEngineService: IWorkflowEngineService = req.scope.resolve(
    ModuleRegistrationName.WORKFLOW_ENGINE
  )

  const { id, workflow_id, transaction_id } = req.params

  const execution = await workflowEngineService.retrieveWorkflowExecution(
    id ?? {
      workflow_id,
      transaction_id,
    },
    {
      select: req.retrieveConfig.select,
      relations: req.retrieveConfig.relations,
    }
  )

  res.status(200).json({
    workflow_execution: execution,
  })
}
