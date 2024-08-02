#!/usr/bin/env node

import { ModulesSdkUtils } from "@ninjajs/utils"
import { Modules } from "@ninjajs/modules-sdk"
import * as Models from "@models"
import { EOL } from "os"

const args = process.argv
const path = args.pop() as string

export default (async () => {
  const { config } = await import("dotenv")
  config()
  if (!path) {
    throw new Error(
      `filePath is required.${EOL}Example: ninja-api-key-seed <filePath>`
    )
  }

  const run = ModulesSdkUtils.buildSeedScript({
    moduleName: Modules.API_KEY,
    models: Models,
    pathToMigrations: __dirname + "/../../migrations",
    seedHandler: async ({ manager, data }) => {
      // TODO: Add seed logic
    },
  })
  await run({ path })
})()
