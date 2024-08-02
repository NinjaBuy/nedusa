import { Modules } from "@ninjajs/modules-sdk"
import { ModulesSdkUtils } from "@ninjajs/utils"
import * as models from "@models"
import { moduleDefinition } from "./module-definition"

export default moduleDefinition

const migrationScriptOptions = {
  moduleName: Modules.WORKFLOW_ENGINE,
  models: models,
  pathToMigrations: __dirname + "/migrations",
}

export const runMigrations = ModulesSdkUtils.buildMigrationScript(
  migrationScriptOptions
)
export const revertMigration = ModulesSdkUtils.buildRevertMigrationScript(
  migrationScriptOptions
)

export * from "./initialize"
export * from "./loaders"
