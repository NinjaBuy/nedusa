import { CommonTypes } from "@ninjajs/types"
import { Request } from "express"
import { NinjaContainer as coreNinjaContainer } from "ninja-core-utils"
import { Customer, User } from "../models"
import { FindConfig, RequestQueryFields } from "./common"

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: (User | Customer) & { customer_id?: string; userId?: string }
      scope: NinjaContainer
      validatedQuery: RequestQueryFields & Record<string, unknown>
      validatedBody: unknown
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
        pagination: {
          order?: Record<string, string>
          skip?: number
          take?: number
        }
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
      requestId?: string
    }
  }
}

export type ExtendedRequest<TEntity> = Request & { resource: TEntity }

export type ClassConstructor<T> = {
  new (...args: unknown[]): T
}

export type NinjaContainer = coreNinjaContainer

export type Logger = {
  panic: (data) => void
  shouldLog: (level: string) => void
  setLogLevel: (level: string) => void
  unsetLogLevel: () => void
  activity: (message: string, config?) => void
  progress: (activityId, message) => void
  error: (messageOrError, error?) => void
  failure: (activityId, message) => void
  success: (activityId, message) => void
  debug: (message) => void
  info: (message) => void
  warn: (message) => void
  log: (...args) => void
}

export type Constructor<T> = new (...args: any[]) => T

export type ConfigModule = CommonTypes.ConfigModule
