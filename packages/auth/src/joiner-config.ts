import { AuthUser } from "@models"
import { MapToConfig } from "@ninjajs/utils"
import { ModuleJoinerConfig } from "@ninjajs/types"
import { Modules } from "@ninjajs/modules-sdk"

export const LinkableKeys = {
  auth_user_id: AuthUser.name,
}

const entityLinkableKeysMap: MapToConfig = {}
Object.entries(LinkableKeys).forEach(([key, value]) => {
  entityLinkableKeysMap[value] ??= []
  entityLinkableKeysMap[value].push({
    mapTo: key,
    valueFrom: key.split("_").pop()!,
  })
})

export const entityNameToLinkableKeysMap: MapToConfig = entityLinkableKeysMap

export const joinerConfig: ModuleJoinerConfig = {
  serviceName: Modules.AUTH,
  primaryKeys: ["id"],
  linkableKeys: LinkableKeys,
  alias: {
    name: ["auth_user", "auth_users"],
    args: {
      entity: AuthUser.name,
    },
  },
}
