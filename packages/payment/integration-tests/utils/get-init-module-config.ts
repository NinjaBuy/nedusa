import { Modules, ModulesDefinition } from "@ninjajs/modules-sdk"

import { DB_URL } from "./database"

export function getInitModuleConfig() {
  const moduleOptions = {
    defaultAdapterOptions: {
      database: {
        clientUrl: DB_URL,
        schema: process.env.NINJA_PAYMENT_DB_SCHEMA,
      },
    },
    providers: [
      {
        resolve: "@ninjajs/payment-stripe",
        options: {
          config: {
            dkk: {
              apiKey: "pk_test_123",
            },
            usd: {
              apiKey: "pk_test_456",
            },
          },
        },
      },
    ],
  }

  const injectedDependencies = {}

  const modulesConfig_ = {
    [Modules.PAYMENT]: {
      definition: ModulesDefinition[Modules.PAYMENT],
      options: moduleOptions,
    },
  }

  return {
    injectedDependencies,
    modulesConfig: modulesConfig_,
    databaseConfig: {
      clientUrl: DB_URL,
      schema: process.env.NINJA_PAYMENT_DB_SCHEMA,
    },
    joinerConfig: [],
  }
}
