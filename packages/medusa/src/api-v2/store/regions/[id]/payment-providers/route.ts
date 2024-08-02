import { remoteQueryObjectFromString } from "@ninjajs/utils"
import { NinjaRequest, NinjaResponse } from "../../../../../types/routing"

export const GET = async (req: NinjaRequest, res: NinjaResponse) => {
  const remoteQuery = req.scope.resolve("remoteQuery")

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "regions",
    fields: ["payment_providers.id", "payment_providers.is_enabled"],
    variables: {
      id: req.params.id,
    },
  })

  const [region] = await remoteQuery(queryObject)

  res.status(200).json({
    payment_providers: region.payment_providers.filter((pp) => pp.is_enabled),
  })
}
