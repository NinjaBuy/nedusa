import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../types/routing"
import { AdminGetPaymentsParamsType } from "./validators"

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminGetPaymentsParamsType>,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "payment",
    variables: {
      filters: req.filterableFields,
      ...req.remoteQueryConfig.pagination,
    },
    fields: req.remoteQueryConfig.fields,
  })

  const { rows: payments, metadata } = await remoteQuery(queryObject)

  res.json({
    payments,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
