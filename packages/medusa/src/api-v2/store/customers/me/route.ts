import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"

import { ModuleRegistrationName } from "@ninjajs/modules-sdk"

export const GET = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const id = req.auth.actor_id

  const customerModule = req.scope.resolve(ModuleRegistrationName.CUSTOMER)

  const customer = await customerModule.retrieve(id, {
    select: req.retrieveConfig.select,
    relations: req.retrieveConfig.relations,
  })

  res.json({ customer })
}
