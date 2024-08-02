import {
  AuthenticatedNinjaRequest,
  NinjaRequest,
  NinjaResponse,
} from "../../../../../../types/routing"
import { CustomerAddressDTO, ICustomerModuleService } from "@ninjajs/types"
import {
  deleteCustomerAddressesWorkflow,
  updateCustomerAddressesWorkflow,
} from "@ninjajs/core-flows"

import { NinjaError } from "@ninjajs/utils"
import { ModuleRegistrationName } from "@ninjajs/modules-sdk"

export const GET = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const id = req.auth.actor_id

  const customerModuleService = req.scope.resolve<ICustomerModuleService>(
    ModuleRegistrationName.CUSTOMER
  )

  const [address] = await customerModuleService.listAddresses(
    { id: req.params.address_id, customer_id: id },
    {
      select: req.retrieveConfig.select,
      relations: req.retrieveConfig.relations,
    }
  )

  res.status(200).json({ address })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<Partial<CustomerAddressDTO>>,
  res: NinjaResponse
) => {
  const id = req.auth.actor_id!
  const service = req.scope.resolve<ICustomerModuleService>(
    ModuleRegistrationName.CUSTOMER
  )

  await validateCustomerAddress(service, id, req.params.address_id)

  const updateAddresses = updateCustomerAddressesWorkflow(req.scope)
  const { result, errors } = await updateAddresses.run({
    input: {
      selector: { id: req.params.address_id, customer_id: req.params.id },
      update: req.validatedBody,
    },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({ address: result[0] })
}

export const DELETE = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const id = req.auth.actor_id

  const service = req.scope.resolve<ICustomerModuleService>(
    ModuleRegistrationName.CUSTOMER
  )

  await validateCustomerAddress(service, id, req.params.address_id)
  const deleteAddress = deleteCustomerAddressesWorkflow(req.scope)

  const { errors } = await deleteAddress.run({
    input: { ids: [req.params.address_id] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({
    id,
    object: "address",
    deleted: true,
  })
}

const validateCustomerAddress = async (
  customerModuleService: ICustomerModuleService,
  customerId: string,
  addressId: string
) => {
  const [address] = await customerModuleService.listAddresses(
    { id: addressId, customer_id: customerId },
    { select: ["id"] }
  )

  if (!address) {
    throw new NinjaError(
      NinjaError.Types.NOT_FOUND,
      `Address with id: ${addressId} was not found`
    )
  }
}
