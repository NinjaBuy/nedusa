import * as entities from "./src/models"

import { TSMigrationGenerator } from "@ninjajs/utils"

module.exports = {
  entities: Object.values(entities),
  schema: "public",
  clientUrl: "postgres://postgres@localhost/ninja-inventory",
  type: "postgresql",
  migrations: {
    generator: TSMigrationGenerator,
  },
}
