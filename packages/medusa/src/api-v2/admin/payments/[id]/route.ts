import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"
import { AdminGetPaymentParamsType } from "../validators"
import { refetchPayment } from "../helpers"

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminGetPaymentParamsType>,
  res: NinjaResponse
) => {
  const payment = await refetchPayment(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ payment })
}
