const { Modules } = require("@ninjajs/modules-sdk")
const DB_HOST = process.env.DB_HOST
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_TEMP_NAME
const DB_URL = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

process.env.POSTGRES_URL = DB_URL
process.env.LOG_LEVEL = "error"

const enableNinjaV2 = process.env.NINJA_FF_NINJA_V2 == "true"

module.exports = {
  plugins: [
    {
      resolve: `ninja-fulfillment-webshipper`,
      options: {
        account: "test-account",
        api_token: "something",
        order_channel_id: "1",
        webhook_secret: "1234",
      },
    },
    {
      resolve: `ninja-plugin-sendgrid`,
      options: {
        api_key: "SG.TEST",
      },
    },
  ],
  projectConfig: {
    // redis_url: REDIS_URL,
    database_url: DB_URL,
    database_type: "postgres",
    jwt_secret: "test",
    cookie_secret: "test",
    database_extra: { idle_in_transaction_session_timeout: 0 },
  },
  featureFlags: {
    ninja_v2: enableNinjaV2,
  },
  modules: {
    workflows: true,

    [Modules.AUTH]: {
      scope: "internal",
      resources: "shared",
      resolve: "@ninjajs/auth",
      options: {
        providers: [
          {
            name: "emailpass",
            scopes: {
              admin: {},
              store: {},
            },
          },
        ],
      },
    },
    [Modules.STOCK_LOCATION]: {
      scope: "internal",
      resources: "shared",
      resolve: "@ninjajs/stock-location",
    },
    [Modules.INVENTORY]: {
      scope: "internal",
      resources: "shared",
      resolve: "@ninjajs/inventory",
    },
    [Modules.PRICING]: {
      scope: "internal",
      resources: "shared",
      resolve: "@ninjajs/pricing",
    },
    [Modules.CACHE]: {
      resolve: "@ninjajs/cache-inmemory",
      options: { ttl: 0 }, // Cache disabled
    },
    [Modules.PRODUCT]: {
      scope: "internal",
      resources: "shared",
      resolve: "@ninjajs/product",
    },
    [Modules.WORKFLOW_ENGINE]: true,
  },
}
