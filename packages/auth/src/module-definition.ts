import * as Models from "@models"

import { AuthModuleService } from "@services"
import { ModuleExports } from "@ninjajs/types"
import { Modules } from "@ninjajs/modules-sdk"
import { ModulesSdkUtils } from "@ninjajs/utils"
import loadConnection from "./loaders/connection"
import loadContainer from "./loaders/container"
import loadProviders from "./loaders/providers"

const migrationScriptOptions = {
  moduleName: Modules.AUTH,
  models: Models,
  pathToMigrations: __dirname + "/migrations",
}

export const runMigrations = ModulesSdkUtils.buildMigrationScript(
  migrationScriptOptions
)
export const revertMigration = ModulesSdkUtils.buildRevertMigrationScript(
  migrationScriptOptions
)

const service = AuthModuleService
const loaders = [loadContainer, loadConnection, loadProviders] as any

export const moduleDefinition: ModuleExports = {
  service,
  loaders,
  runMigrations,
  revertMigration,
}
