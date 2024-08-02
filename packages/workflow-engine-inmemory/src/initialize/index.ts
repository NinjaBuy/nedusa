import {
  ExternalModuleDeclaration,
  InternalModuleDeclaration,
  MODULE_PACKAGE_NAMES,
  NinjaModule,
  Modules,
} from "@ninjajs/modules-sdk"
import { ModulesSdkTypes } from "@ninjajs/types"
import { IWorkflowEngineService } from "@ninjajs/workflows-sdk"
import { moduleDefinition } from "../module-definition"
import { InitializeModuleInjectableDependencies } from "../types"

export const initialize = async (
  options?:
    | ModulesSdkTypes.ModuleServiceInitializeOptions
    | ModulesSdkTypes.ModuleServiceInitializeCustomDataLayerOptions
    | ExternalModuleDeclaration
    | InternalModuleDeclaration,
  injectedDependencies?: InitializeModuleInjectableDependencies
): Promise<IWorkflowEngineService> => {
  const loaded =
    // eslint-disable-next-line max-len
    await NinjaModule.bootstrap<IWorkflowEngineService>({
      moduleKey: Modules.WORKFLOW_ENGINE,
      defaultPath: MODULE_PACKAGE_NAMES[Modules.WORKFLOW_ENGINE],
      declaration: options as
        | InternalModuleDeclaration
        | ExternalModuleDeclaration,
      injectedDependencies,
      moduleExports: moduleDefinition,
    })

  return loaded[Modules.WORKFLOW_ENGINE]
}
