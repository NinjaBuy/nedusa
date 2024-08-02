import { ModuleServiceInitializeOptions } from "@ninjajs/types"

export const databaseOptions: ModuleServiceInitializeOptions["database"] = {
  schema: "public",
  clientUrl: "ninja-payment-test",
}
