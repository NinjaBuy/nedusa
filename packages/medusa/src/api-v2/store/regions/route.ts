import { remoteQueryObjectFromString } from "@ninjajs/utils"
import { NinjaRequest, NinjaResponse } from "../../../types/routing"
import { defaultStoreRegionFields } from "./query-config"

export const GET = async (req: NinjaRequest, res: NinjaResponse) => {
  const remoteQuery = req.scope.resolve("remoteQuery")

  const variables = { filters: req.filterableFields }

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "region",
    variables,
    fields: defaultStoreRegionFields,
  })

  // TODO: Add count, offset, limit
  const regions = await remoteQuery(queryObject)

  res.json({ regions })
}
