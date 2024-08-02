import { ConfigModule } from "@ninjajs/types"

import { ModulesDefinition } from "@ninjajs/modules-sdk"

/**
 * Merge the modules config from the ninja-config file with the modules config from ninja package
 * @param modules
 * @param ninjaInternalModulesConfig
 */
export function mergeModulesConfig(
  modules: ConfigModule["modules"] = {},
  ninjaInternalModulesConfig = {}
) {
  const modules_ = ({ ...modules } as ConfigModule["modules"])!

  const userModulesConfigKeys = Object.keys(modules)
  const internalModulesConfigKeys = Object.keys(ninjaInternalModulesConfig)

  const allModulesKeys = new Set([
    ...userModulesConfigKeys,
    ...internalModulesConfigKeys,
  ])

  for (const moduleName of allModulesKeys) {
    const internalModuleConfig = ninjaInternalModulesConfig[moduleName]

    const moduleDefinition = ModulesDefinition[moduleName]

    if (moduleDefinition?.isLegacy) {
      continue
    }

    modules_[moduleName] ??= internalModuleConfig
  }

  return modules_
}
