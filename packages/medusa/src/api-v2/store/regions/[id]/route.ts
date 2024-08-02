import { remoteQueryObjectFromString } from "@ninjajs/utils"
import { NinjaRequest, NinjaResponse } from "../../../../types/routing"
import { defaultStoreRegionFields } from "../query-config"

export const GET = async (req: NinjaRequest, res: NinjaResponse) => {
  const remoteQuery = req.scope.resolve("remoteQuery")

  const variables = { id: req.params.id }

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "region",
    variables,
    fields: defaultStoreRegionFields,
  })

  const [region] = await remoteQuery(queryObject)

  res.status(200).json({ region })
}
