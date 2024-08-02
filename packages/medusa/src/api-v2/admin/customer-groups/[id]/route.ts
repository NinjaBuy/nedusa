import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"
import {
  deleteCustomerGroupsWorkflow,
  updateCustomerGroupsWorkflow,
} from "@ninjajs/core-flows"

import { refetchCustomerGroup } from "../helpers"
import { AdminUpdateCustomerGroupType } from "../validators"

export const GET = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const customerGroup = await refetchCustomerGroup(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ customer_group: customerGroup })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminUpdateCustomerGroupType>,
  res: NinjaResponse
) => {
  const updateGroups = updateCustomerGroupsWorkflow(req.scope)
  const { result, errors } = await updateGroups.run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody,
    },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const customerGroup = await refetchCustomerGroup(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )
  res.status(200).json({ customer_group: customerGroup })
}

export const DELETE = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const id = req.params.id
  const deleteCustomerGroups = deleteCustomerGroupsWorkflow(req.scope)

  const { errors } = await deleteCustomerGroups.run({
    input: { ids: [id] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({
    id,
    object: "customer_group",
    deleted: true,
  })
}
