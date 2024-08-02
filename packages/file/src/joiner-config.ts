import { Modules } from "@ninjajs/modules-sdk"
import { ModuleJoinerConfig } from "@ninjajs/types"
import { MapToConfig } from "@ninjajs/utils"

export const LinkableKeys = {}

const entityLinkableKeysMap: MapToConfig = {}
export const entityNameToLinkableKeysMap: MapToConfig = entityLinkableKeysMap

export const joinerConfig: ModuleJoinerConfig = {
  serviceName: Modules.FILE,
  primaryKeys: ["id"],
  linkableKeys: LinkableKeys,
  alias: [
    {
      name: ["file", "files"],
      args: {
        entity: "File",
      },
    },
  ],
}
