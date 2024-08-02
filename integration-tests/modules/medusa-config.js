const { Modules } = require("@ninjajs/modules-sdk")
const { FulfillmentModuleOptions } = require("@ninjajs/fulfillment")
const DB_HOST = process.env.DB_HOST
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_TEMP_NAME
const DB_URL = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
process.env.POSTGRES_URL = DB_URL
process.env.LOG_LEVEL = "error"

const enableNinjaV2 = process.env.NINJA_FF_NINJA_V2 == "true"

const customPaymentProvider = {
  resolve: {
    services: [require("@ninjajs/payment/dist/providers/system").default],
  },
  options: {
    config: {
      default_2: {},
    },
  },
}

const customFulfillmentProvider = {
  resolve: "@ninjajs/fulfillment-manual",
  options: {
    config: {
      "test-provider": {},
    },
  },
}

module.exports = {
  plugins: [],
  projectConfig: {
    database_url: DB_URL,
    database_type: "postgres",
    jwt_secret: "test",
    cookie_secret: "test",
  },
  featureFlags: {
    ninja_v2: enableNinjaV2,
  },
  modules: {
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
    [Modules.USER]: {
      scope: "internal",
      resources: "shared",
      resolve: "@ninjajs/user",
      options: {
        jwt_secret: "test",
      },
    },
    [Modules.CACHE]: {
      resolve: "@ninjajs/cache-inmemory",
      options: { ttl: 0 }, // Cache disabled
    },
    [Modules.STOCK_LOCATION]: {
      resolve: "@ninjajs/stock-location-next",
      options: {},
    },
    [Modules.INVENTORY]: {
      resolve: "@ninjajs/inventory-next",
      options: {},
    },
    [Modules.PRODUCT]: true,
    [Modules.PRICING]: true,
    [Modules.PROMOTION]: true,
    [Modules.CUSTOMER]: true,
    [Modules.SALES_CHANNEL]: true,
    [Modules.CART]: true,
    [Modules.WORKFLOW_ENGINE]: true,
    [Modules.REGION]: true,
    [Modules.API_KEY]: true,
    [Modules.STORE]: true,
    [Modules.TAX]: true,
    [Modules.CURRENCY]: true,
    [Modules.ORDER]: true,
    [Modules.PAYMENT]: {
      resolve: "@ninjajs/payment",
      /** @type {import('@ninjajs/payment').PaymentModuleOptions}*/
      options: {
        providers: [customPaymentProvider],
      },
    },
    [Modules.FULFILLMENT]: {
      /** @type {import('@ninjajs/fulfillment').FulfillmentModuleOptions} */
      options: {
        providers: [customFulfillmentProvider],
      },
    },
  },
}
