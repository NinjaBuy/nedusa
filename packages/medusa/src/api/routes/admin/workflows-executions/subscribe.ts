import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { IWorkflowEngineService } from "@ninjajs/workflows-sdk"
import { NinjaRequest, NinjaResponse } from "../../../../types/routing"

export default async (req: NinjaRequest, res: NinjaResponse) => {
  const workflowEngineService: IWorkflowEngineService = req.scope.resolve(
    ModuleRegistrationName.WORKFLOW_ENGINE
  )

  const { id: workflow_id, transaction_id } = req.query as any

  const subscriberId = "__sub__" + Math.random().toString(36).substring(2, 9)
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  })

  req.on("close", () => {
    res.end()

    void workflowEngineService.unsubscribe({
      workflowId: workflow_id,
      transactionId: transaction_id,
      subscriberOrId: subscriberId,
    })
  })

  req.on("error", (err: any) => {
    if (err.code === "ECONNRESET") {
      res.end()
    }
  })

  void workflowEngineService.subscribe({
    workflowId: workflow_id,
    transactionId: transaction_id,
    subscriber: async (args) => {
      const {
        eventType,
        workflowId,
        transactionId,
        step,
        response,
        result,
        errors,
      } = args

      const data = {
        event_type: eventType,
        workflow_id: workflowId,
        transaction_id: transactionId,
        step,
        response,
        result,
        errors,
      }
      res.write(`event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`)
    },
    subscriberId,
  })
}
