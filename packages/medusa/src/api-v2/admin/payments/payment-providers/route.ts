import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"
import { AdminGetPaymentProvidersParamsType } from "../validators"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminGetPaymentProvidersParamsType>,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "payment_provider",
    variables: {
      filters: req.filterableFields,
      ...req.remoteQueryConfig.pagination,
    },
    fields: req.remoteQueryConfig.fields,
  })

  const { rows: payment_providers, metadata } = await remoteQuery(queryObject)

  res.json({
    payment_providers,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
