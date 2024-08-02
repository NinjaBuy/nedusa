import { ModuleExports } from "@ninjajs/modules-sdk"
import Loader from "./loaders"
import LocalEventBus from "./services/event-bus-local"

export const service = LocalEventBus
export const loaders = [Loader]

const moduleDefinition: ModuleExports = {
  service,
  loaders,
}

export default moduleDefinition
export * from "./initialize"
