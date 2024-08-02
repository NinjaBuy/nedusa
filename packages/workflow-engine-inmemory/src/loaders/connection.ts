import {
  InternalModuleDeclaration,
  LoaderOptions,
  Modules,
} from "@ninjajs/modules-sdk"
import { ModulesSdkTypes } from "@ninjajs/types"
import { ModulesSdkUtils } from "@ninjajs/utils"
import { EntitySchema } from "@mikro-orm/core"
import * as WorkflowOrchestratorModels from "../models"

export default async (
  {
    options,
    container,
    logger,
  }: LoaderOptions<
    | ModulesSdkTypes.ModuleServiceInitializeOptions
    | ModulesSdkTypes.ModuleServiceInitializeCustomDataLayerOptions
  >,
  moduleDeclaration?: InternalModuleDeclaration
): Promise<void> => {
  const entities = Object.values(
    WorkflowOrchestratorModels
  ) as unknown as EntitySchema[]
  const pathToMigrations = __dirname + "/../migrations"

  await ModulesSdkUtils.mikroOrmConnectionLoader({
    moduleName: Modules.WORKFLOW_ENGINE,
    entities,
    container,
    options,
    moduleDeclaration,
    logger,
    pathToMigrations,
  })
}
