import { NinjaModule, Modules } from "@ninjajs/modules-sdk"
import { IEventBusService } from "@ninjajs/types"

export const initialize = async (): Promise<IEventBusService> => {
  const serviceKey = Modules.EVENT_BUS
  const loaded = await NinjaModule.bootstrap<IEventBusService>({
    moduleKey: serviceKey,
    defaultPath: "@ninjajs/event-bus-local",
  })

  return loaded[serviceKey]
}
