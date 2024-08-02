import {
  deletePriceListsWorkflow,
  updatePriceListsWorkflow,
} from "@ninjajs/core-flows"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"
import { fetchPriceList } from "../helpers"
import { AdminUpdatePriceListType } from "../validators"

export const GET = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const price_list = await fetchPriceList(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ price_list })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminUpdatePriceListType>,
  res: NinjaResponse
) => {
  const id = req.params.id
  const workflow = updatePriceListsWorkflow(req.scope)

  const { errors } = await workflow.run({
    input: { price_lists_data: [{ ...req.validatedBody, id }] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const price_list = await fetchPriceList(
    id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ price_list })
}

export const DELETE = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  const id = req.params.id
  const workflow = deletePriceListsWorkflow(req.scope)

  const { errors } = await workflow.run({
    input: { ids: [id] },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({
    id,
    object: "price_list",
    deleted: true,
  })
}
