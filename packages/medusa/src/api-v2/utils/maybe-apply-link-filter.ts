import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@ninjajs/utils"
import { NextFunction } from "express"
import { NinjaRequest } from "../../types/routing"

export function maybeApplyLinkFilter({
  entryPoint,
  resourceId,
  filterableField,
}) {
  return async (req: NinjaRequest, _, next: NextFunction) => {
    const filterableFields = req.filterableFields

    if (!filterableFields?.[filterableField]) {
      return next()
    }

    const filterFields = filterableFields[filterableField]

    const idsToFilterBy = Array.isArray(filterFields)
      ? filterFields
      : [filterFields]

    delete filterableFields[filterableField]

    const remoteQuery = req.scope.resolve(
      ContainerRegistrationKeys.REMOTE_QUERY
    )

    const queryObject = remoteQueryObjectFromString({
      entryPoint,
      fields: [resourceId],
      variables: { [filterableField]: idsToFilterBy },
    })

    const resources = await remoteQuery(queryObject)

    filterableFields.id = resources.map((p) => p[resourceId])

    return next()
  }
}
