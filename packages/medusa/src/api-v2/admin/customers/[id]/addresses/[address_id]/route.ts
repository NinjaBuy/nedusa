import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../../../types/routing"
import {
  deleteCustomerAddressesWorkflow,
  updateCustomerAddressesWorkflow,
} from "@ninjajs/core-flows"

import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"
import { AdminCreateCustomerAddressType } from "../../../validators"
import { refetchCustomer } from "../../../helpers"

export const GET = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "customer_address",
    variables: {
      filters: { id: req.params.address_id, customer_id: req.params.id },
    },
    fields: req.remoteQueryConfig.fields,
  })

  const [address] = await remoteQuery(queryObject)

  res.status(200).json({ address })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminCreateCustomerAddressType>,
  res: NinjaResponse
) => {
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

  const customer = await refetchCustomer(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ customer })
}

export const DELETE = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const id = req.params.address_id
  const deleteAddress = deleteCustomerAddressesWorkflow(req.scope)

  const { errors } = await deleteAddress.run({
    input: { ids: [id] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const customer = await refetchCustomer(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({
    id,
    object: "customer_address",
    deleted: true,
    parent: customer,
  })
}
