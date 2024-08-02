import { NinjaError } from "@ninjajs/utils"
import { NinjaRequest, NinjaResponse } from "../../../../types/routing"
import { refetchOrder } from "../helpers"
import { defaultAdminOrderFields } from "../query-config"

export const GET = async (req: NinjaRequest, res: NinjaResponse) => {
  const draftOrder = await refetchOrder(
    req.params.id,
    req.scope,
    defaultAdminOrderFields
  )

  if (!draftOrder) {
    throw new NinjaError(
      NinjaError.Types.NOT_FOUND,
      `Draft order with id: ${req.params.id} was not found`
    )
  }

  res.status(200).json({ draft_order: draftOrder })
}
