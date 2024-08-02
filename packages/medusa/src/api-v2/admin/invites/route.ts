import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../types/routing"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"

import { createInvitesWorkflow } from "@ninjajs/core-flows"
import { AdminCreateInviteType, AdminGetInvitesParamsType } from "./validators"
import { refetchInvite } from "./helpers"

export const GET = async (
  req: AuthenticatedNinjaRequest<AdminGetInvitesParamsType>,
  res: NinjaResponse
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "invite",
    variables: {
      filters: req.filterableFields,
      ...req.remoteQueryConfig.pagination,
    },
    fields: req.remoteQueryConfig.fields,
  })

  const { rows: invites, metadata } = await remoteQuery(queryObject)

  res.json({
    invites,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedNinjaRequest<AdminCreateInviteType>,
  res: NinjaResponse
) => {
  const workflow = createInvitesWorkflow(req.scope)

  const input = {
    input: {
      invites: [req.validatedBody],
    },
  }

  const { result } = await workflow.run(input)
  const invite = await refetchInvite(
    result[0].id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ invite })
}
