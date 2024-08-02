import { createServiceZonesWorkflow } from "@ninjajs/core-flows"
import { NinjaRequest, NinjaResponse } from "../../../../../types/routing"
import { AdminCreateFulfillmentSetServiceZonesType } from "../../validators"
import { refetchFulfillmentSet } from "../../helpers"

export const POST = async (
  req: NinjaRequest<AdminCreateFulfillmentSetServiceZonesType>,
  res: NinjaResponse
) => {
  const workflowInput = {
    data: [
      {
        fulfillment_set_id: req.params.id,
        name: req.validatedBody.name,
        geo_zones: req.validatedBody.geo_zones,
      },
    ],
  }

  const { errors } = await createServiceZonesWorkflow(req.scope).run({
    input: workflowInput,
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const fulfillmentSet = await refetchFulfillmentSet(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ fulfillment_set: fulfillmentSet })
}
