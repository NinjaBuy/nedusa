import { ApiKeyType, RevokeApiKeyDTO, UpdateApiKeyDTO } from "@ninjajs/types"
import { IEventBusModuleService, Logger } from "@ninjajs/types"

export type InitializeModuleInjectableDependencies = {
  logger?: Logger
  eventBusService?: IEventBusModuleService
}

export type CreateApiKeyDTO = {
  token: string
  salt: string
  redacted: string
  title: string
  type: ApiKeyType
  created_by: string
}

export type TokenDTO = {
  rawToken: string
  hashedToken: string
  salt: string
  redacted: string
}

export type UpdateApiKeyInput = UpdateApiKeyDTO & { id: string }
export type RevokeApiKeyInput = RevokeApiKeyDTO & { id: string }
