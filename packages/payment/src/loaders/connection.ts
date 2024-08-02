import {
  InternalModuleDeclaration,
  LoaderOptions,
  Modules,
} from "@ninjajs/modules-sdk"
import { ModulesSdkTypes } from "@ninjajs/types"
import { ModulesSdkUtils } from "@ninjajs/utils"
import { EntitySchema } from "@mikro-orm/core"
import * as PaymentModels from "../models"

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
  const entities = Object.values(PaymentModels) as unknown as EntitySchema[]
  const pathToMigrations = __dirname + "/../migrations"

  await ModulesSdkUtils.mikroOrmConnectionLoader({
    moduleName: Modules.PAYMENT,
    entities,
    container,
    options,
    moduleDeclaration,
    logger,
    pathToMigrations,
  })
}
