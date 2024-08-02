import {
  MODULE_PACKAGE_NAMES,
  NinjaApp,
  NinjaAppMigrateUp,
  NinjaAppOutput,
  NinjaModule,
  Modules,
  ModulesDefinition,
} from "@ninjajs/modules-sdk"
import {
  CommonTypes,
  InternalModuleDeclaration,
  LoadedModule,
  NinjaContainer,
  ModuleDefinition,
} from "@ninjajs/types"
import {
  ContainerRegistrationKeys,
  FlagRouter,
  NinjaV2Flag,
  isObject,
} from "@ninjajs/utils"

import { asValue } from "awilix"
import { remoteQueryFetchData } from "../utils/remote-query-fetch-data"

export function mergeDefaultModules(
  modulesConfig: CommonTypes.ConfigModule["modules"]
) {
  const defaultModules = Object.values(ModulesDefinition).filter(
    (definition: ModuleDefinition) => {
      return !!definition.defaultPackage
    }
  )

  const configModules = { ...modulesConfig } ?? {}

  for (const defaultModule of defaultModules as ModuleDefinition[]) {
    configModules[defaultModule.key] ??= defaultModule.defaultModuleDeclaration
  }

  return configModules
}

export async function migrateNinjaApp(
  {
    configModule,
    container,
  }: {
    configModule: {
      modules?: CommonTypes.ConfigModule["modules"]
      projectConfig: CommonTypes.ConfigModule["projectConfig"]
    }
    container: NinjaContainer
  },
  config = { registerInContainer: true }
): Promise<void> {
  const injectedDependencies = {
    [ContainerRegistrationKeys.PG_CONNECTION]: container.resolve(
      ContainerRegistrationKeys.PG_CONNECTION
    ),
    [ContainerRegistrationKeys.LOGGER]: container.resolve(
      ContainerRegistrationKeys.LOGGER
    ),
  }

  const sharedResourcesConfig = {
    database: {
      clientUrl:
        injectedDependencies[ContainerRegistrationKeys.PG_CONNECTION]?.client
          ?.config?.connection?.connectionString ??
        configModule.projectConfig.database_url,
      driverOptions: configModule.projectConfig.database_driver_options,
      debug: !!(configModule.projectConfig.database_logging ?? false),
    },
  }
  const configModules = mergeDefaultModules(configModule.modules)

  // Apply default options to legacy modules
  for (const moduleKey of Object.keys(configModules)) {
    if (!ModulesDefinition[moduleKey]?.isLegacy) {
      continue
    }

    if (isObject(configModules[moduleKey])) {
      ;(
        configModules[moduleKey] as Partial<InternalModuleDeclaration>
      ).options ??= {
        database: {
          type: "postgres",
          url: sharedResourcesConfig.database.clientUrl,
          clientUrl: sharedResourcesConfig.database.clientUrl,
          extra: configModule.projectConfig.database_extra,
          schema: configModule.projectConfig.database_schema,
          logging: configModule.projectConfig.database_logging,
        },
      }
    }
  }

  await NinjaAppMigrateUp({
    modulesConfig: configModules,
    remoteFetchData: remoteQueryFetchData(container),
    sharedContainer: container,
    sharedResourcesConfig,
    injectedDependencies,
  })
}

export const loadNinjaApp = async (
  {
    configModule,
    container,
  }: {
    configModule: {
      modules?: CommonTypes.ConfigModule["modules"]
      projectConfig: CommonTypes.ConfigModule["projectConfig"]
    }
    container: NinjaContainer
  },
  config = { registerInContainer: true }
): Promise<NinjaAppOutput> => {
  const featureFlagRouter = container.resolve<FlagRouter>("featureFlagRouter")
  const isNinjaV2Enabled = featureFlagRouter.isFeatureEnabled(NinjaV2Flag.key)
  const injectedDependencies = {
    [ContainerRegistrationKeys.PG_CONNECTION]: container.resolve(
      ContainerRegistrationKeys.PG_CONNECTION
    ),
    [ContainerRegistrationKeys.LOGGER]: container.resolve(
      ContainerRegistrationKeys.LOGGER
    ),
  }

  const sharedResourcesConfig = {
    database: {
      clientUrl: configModule.projectConfig.database_url,
      driverOptions: configModule.projectConfig.database_driver_options,
      debug: !!(configModule.projectConfig.database_logging ?? false),
    },
  }

  container.register(ContainerRegistrationKeys.REMOTE_QUERY, asValue(undefined))
  container.register(ContainerRegistrationKeys.REMOTE_LINK, asValue(undefined))

  const configModules = mergeDefaultModules(configModule.modules)

  // Apply default options to legacy modules
  for (const moduleKey of Object.keys(configModules)) {
    if (!ModulesDefinition[moduleKey]?.isLegacy) {
      continue
    }

    if (isObject(configModules[moduleKey])) {
      ;(
        configModules[moduleKey] as Partial<InternalModuleDeclaration>
      ).options ??= {
        database: {
          type: "postgres",
          url: configModule.projectConfig.database_url,
          extra: configModule.projectConfig.database_extra,
          schema: configModule.projectConfig.database_schema,
          logging: configModule.projectConfig.database_logging,
        },
      }
    }
  }

  const ninjaApp = await NinjaApp({
    workerMode: configModule.projectConfig.worker_mode,
    modulesConfig: configModules,
    remoteFetchData: remoteQueryFetchData(container),
    sharedContainer: container,
    sharedResourcesConfig,
    injectedDependencies,
  })

  const requiredModuleKeys = [Modules.PRODUCT, Modules.PRICING]

  const missingPackages: string[] = []

  if (isNinjaV2Enabled) {
    for (const requiredModuleKey of requiredModuleKeys) {
      const isModuleInstalled = NinjaModule.isInstalled(requiredModuleKey)

      if (!isModuleInstalled) {
        missingPackages.push(
          MODULE_PACKAGE_NAMES[requiredModuleKey] || requiredModuleKey
        )
      }
    }

    if (missingPackages.length) {
      throw new Error(
        `FeatureFlag ninja_v2 (NINJA_FF_NINJA_V2) requires the following packages/module registration: (${missingPackages.join(
          ", "
        )})`
      )
    }
  }

  if (!config.registerInContainer) {
    return ninjaApp
  }

  container.register(
    ContainerRegistrationKeys.REMOTE_LINK,
    asValue(ninjaApp.link)
  )
  container.register(
    ContainerRegistrationKeys.REMOTE_QUERY,
    asValue(ninjaApp.query)
  )

  for (const moduleService of Object.values(ninjaApp.modules)) {
    const loadedModule = moduleService as LoadedModule
    container.register(
      loadedModule.__definition.registrationName,
      asValue(moduleService)
    )
  }

  // Register all unresolved modules as undefined to be present in the container with undefined value by defaul
  // but still resolvable
  for (const moduleDefinition of Object.values(ModulesDefinition)) {
    if (!container.hasRegistration(moduleDefinition.registrationName)) {
      container.register(moduleDefinition.registrationName, asValue(undefined))
    }
  }

  return ninjaApp
}

/**
 * Run the modules loader without taking care of anything else. This is useful for running the loader as a separate action or to re run all modules loaders.
 *
 * @param configModule
 * @param container
 */
export async function runModulesLoader({
  configModule,
  container,
}: {
  configModule: {
    modules?: CommonTypes.ConfigModule["modules"]
    projectConfig: CommonTypes.ConfigModule["projectConfig"]
  }
  container: NinjaContainer
}): Promise<void> {
  const injectedDependencies = {
    [ContainerRegistrationKeys.PG_CONNECTION]: container.resolve(
      ContainerRegistrationKeys.PG_CONNECTION
    ),
    [ContainerRegistrationKeys.LOGGER]: container.resolve(
      ContainerRegistrationKeys.LOGGER
    ),
  }

  const sharedResourcesConfig = {
    database: {
      clientUrl: configModule.projectConfig.database_url,
      driverOptions: configModule.projectConfig.database_driver_options,
      debug: !!(configModule.projectConfig.database_logging ?? false),
    },
  }

  const configModules = mergeDefaultModules(configModule.modules)

  // Apply default options to legacy modules
  for (const moduleKey of Object.keys(configModules)) {
    if (!ModulesDefinition[moduleKey]?.isLegacy) {
      continue
    }

    if (isObject(configModules[moduleKey])) {
      ;(
        configModules[moduleKey] as Partial<InternalModuleDeclaration>
      ).options ??= {
        database: {
          type: "postgres",
          url: configModule.projectConfig.database_url,
          extra: configModule.projectConfig.database_extra,
          schema: configModule.projectConfig.database_schema,
          logging: configModule.projectConfig.database_logging,
        },
      }
    }
  }

  await NinjaApp({
    modulesConfig: configModules,
    remoteFetchData: remoteQueryFetchData(container),
    sharedContainer: container,
    sharedResourcesConfig,
    injectedDependencies,
    loaderOnly: true,
  })
}

export default loadNinjaApp
