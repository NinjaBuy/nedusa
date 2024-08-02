import type { NextFunction, Request, Response } from "express"
import type { Customer, User } from "../models"

import { NinjaContainer, RequestQueryFields } from "@ninjajs/types"
import { FindConfig } from "./common"
import * as core from "express-serve-static-core"

export interface NinjaRequest<Body = unknown>
  extends Request<core.ParamsDictionary, any, Body> {
  validatedBody: Body
  validatedQuery: RequestQueryFields & Record<string, unknown>
  /**
   * TODO: shouldn't this correspond to returnable fields instead of allowed fields? also it is used by the cleanResponseData util
   */
  allowedProperties: string[]
  /**
   * An object containing the select, relation, skip, take and order to be used with ninja internal services
   */
  listConfig: FindConfig<unknown>
  /**
   * An object containing the select, relation to be used with ninja internal services
   */
  retrieveConfig: FindConfig<unknown>
  /**
   * An object containing fields and variables to be used with the remoteQuery
   */
  remoteQueryConfig: {
    fields: string[]
    pagination: { order?: Record<string, string>; skip?: number; take?: number }
  }
  /**
   * An object containing the fields that are filterable e.g `{ id: Any<String> }`
   */
  filterableFields: Record<string, unknown>
  includes?: Record<string, boolean>
  /**
   * An array of fields and relations that are allowed to be queried, this can be set by the
   * consumer as part of a middleware and it will take precedence over the defaultAllowedFields
   * @deprecated use `allowed` instead
   */
  allowedFields?: string[]
  /**
   * An array of fields and relations that are allowed to be queried, this can be set by the
   * consumer as part of a middleware and it will take precedence over the defaultAllowedFields set
   * by the api
   */
  allowed?: string[]
  errors: string[]
  scope: NinjaContainer
  session?: any
  rawBody?: any
  requestId?: string
}

export interface AuthenticatedNinjaRequest<Body = never>
  extends NinjaRequest<Body> {
  user: (User | Customer) & { customer_id?: string; userId?: string } // TODO: Remove this property when v2 is released
  auth: {
    actor_id: string
    auth_user_id: string
    app_metadata: Record<string, any>
    scope: string
  }
}

export type NinjaResponse<Body = unknown> = Response<Body>

export type NinjaNextFunction = NextFunction

export type NinjaRequestHandler<Body = unknown, Res = unknown> = (
  req: NinjaRequest<Body>,
  res: NinjaResponse<Res>,
  next: NinjaNextFunction
) => Promise<void> | void
