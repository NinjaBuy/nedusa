import * as AuthModels from "../models"

import {
  InternalModuleDeclaration,
  LoaderOptions,
  Modules,
} from "@ninjajs/modules-sdk"

import { EntitySchema } from "@mikro-orm/core"
import { ModulesSdkTypes } from "@ninjajs/types"
import { ModulesSdkUtils } from "@ninjajs/utils"

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
    AuthModels
  ) as unknown as EntitySchema[]
  const pathToMigrations = __dirname + "/../migrations"

  await ModulesSdkUtils.mikroOrmConnectionLoader({
    moduleName: Modules.AUTH,
    entities,
    container,
    options,
    moduleDeclaration,
    logger,
    pathToMigrations,
  })
}
