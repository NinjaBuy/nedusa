import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"

import { AdminGetWorkflowExecutionDetailsParamsType } from "../validators"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminGetWorkflowExecutionDetailsParamsType>,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const variables = { id: req.params.id }

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "workflow_execution",
    variables,
    fields: req.remoteQueryConfig.fields,
  })

  const [workflowExecution] = await remoteQuery(queryObject)
  res.status(200).json({ workflow_execution: workflowExecution })
}
