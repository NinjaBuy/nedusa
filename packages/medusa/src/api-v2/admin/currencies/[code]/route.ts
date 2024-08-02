import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"
import { NinjaRequest, NinjaResponse } from "../../../../types/routing"

export const GET = async (req: NinjaRequest, res: NinjaResponse) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const variables = { code: req.params.code }

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "currency",
    variables,
    fields: req.remoteQueryConfig.fields,
  })

  const [currency] = await remoteQuery(queryObject)
  res.status(200).json({ currency })
}
