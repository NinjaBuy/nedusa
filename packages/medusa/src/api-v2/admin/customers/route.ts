import { createCustomersWorkflow } from "@ninjajs/core-flows"
import {
  AdminCustomerListResponse,
  AdminCustomerResponse,
} from "@ninjajs/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../types/routing"
import { AdminCreateCustomerType } from "./validators"
import { refetchCustomer } from "./helpers"

export const GET = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse<AdminCustomerListResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const query = remoteQueryObjectFromString({
    entryPoint: "customers",
    variables: {
      filters: req.filterableFields,
      ...req.remoteQueryConfig.pagination,
    },
    fields: req.remoteQueryConfig.fields,
  })

  const { rows: customers, metadata } = await remoteQuery(query)

  res.json({
    customers,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminCreateCustomerType>,
  res: NinjaResponse<AdminCustomerResponse>
) => {
  const createCustomers = createCustomersWorkflow(req.scope)

  const customersData = [
    {
      ...req.validatedBody,
      created_by: req.auth?.actor_id,
    },
  ]

  const { result, errors } = await createCustomers.run({
    input: { customersData },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const customer = await refetchCustomer(
    result[0].id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ customer })
}
