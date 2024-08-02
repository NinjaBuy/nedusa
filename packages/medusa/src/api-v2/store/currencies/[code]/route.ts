import { remoteQueryObjectFromString } from "@ninjajs/utils"
import { NinjaRequest, NinjaResponse } from "../../../../types/routing"
import { defaultStoreCurrencyFields } from "../query-config"

export const GET = async (req: NinjaRequest, res: NinjaResponse) => {
  const remoteQuery = req.scope.resolve("remoteQuery")

  const variables = { code: req.params.code }

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "currency",
    variables,
    fields: defaultStoreCurrencyFields,
  })

  const [currency] = await remoteQuery(queryObject)
  res.status(200).json({ currency })
}
