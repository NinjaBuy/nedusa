import {
  AuthenticatedNinjaRequest,
  NinjaRequest,
  NinjaResponse,
} from "../../../../../types/routing"
import {
  CreateCustomerAddressDTO,
  ICustomerModuleService,
} from "@ninjajs/types"

import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { createCustomerAddressesWorkflow } from "@ninjajs/core-flows"

export const GET = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const customerId = req.auth.actor_id

  const customerModuleService = req.scope.resolve<ICustomerModuleService>(
    ModuleRegistrationName.CUSTOMER
  )

  const [addresses, count] = await customerModuleService.listAndCountAddresses(
    { ...req.filterableFields, customer_id: customerId },
    req.listConfig
  )

  const { offset, limit } = req.validatedQuery

  res.json({
    count,
    addresses,
    offset,
    limit,
  })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<CreateCustomerAddressDTO>,
  res: NinjaResponse
) => {
  const customerId = req.auth.actor_id

  const createAddresses = createCustomerAddressesWorkflow(req.scope)
  const addresses = [
    {
      ...req.validatedBody,
      customer_id: customerId,
    },
  ]

  const { result, errors } = await createAddresses.run({
    input: { addresses },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({ address: result[0] })
}
