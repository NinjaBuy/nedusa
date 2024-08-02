import {
  deleteCustomersWorkflow,
  updateCustomersWorkflow,
} from "@ninjajs/core-flows"
import { AdminCustomerResponse } from "@ninjajs/types"
import { NinjaError } from "@ninjajs/utils"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"
import { refetchCustomer } from "../helpers"
import { AdminUpdateCustomerType } from "../validators"

export const GET = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse<AdminCustomerResponse>
) => {
  const customer = await refetchCustomer(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  if (!customer) {
    throw new NinjaError(
      NinjaError.Types.NOT_FOUND,
      `Customer with id: ${req.params.id} not found`
    )
  }

  res.status(200).json({ customer })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminUpdateCustomerType>,
  res: NinjaResponse<AdminCustomerResponse>
) => {
  const { errors } = await updateCustomersWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
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
  const id = req.params.id
  const deleteCustomers = deleteCustomersWorkflow(req.scope)

  const { errors } = await deleteCustomers.run({
    input: { ids: [id] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({
    id,
    object: "customer",
    deleted: true,
  })
}
