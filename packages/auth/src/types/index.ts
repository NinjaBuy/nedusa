import { Logger } from "@ninjajs/types"

export type InitializeModuleInjectableDependencies = {
  logger?: Logger
}

export * as RepositoryTypes from "./repositories"
export * as ServiceTypes from "./services"
