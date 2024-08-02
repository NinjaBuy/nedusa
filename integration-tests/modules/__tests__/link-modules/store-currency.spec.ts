import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { ICurrencyModuleService, IStoreModuleService } from "@ninjajs/types"
import { ninjaIntegrationTestRunner } from "ninja-test-utils"

jest.setTimeout(50000)

const env = { NINJA_FF_NINJA_V2: true }

ninjaIntegrationTestRunner({
  env,
  testSuite: ({ getContainer }) => {
    describe("Link: Store Currency", () => {
      let appContainer
      let storeModuleService: IStoreModuleService
      let currencyModuleService: ICurrencyModuleService
      let remoteQuery

      beforeAll(async () => {
        appContainer = getContainer()
        storeModuleService = appContainer.resolve(ModuleRegistrationName.STORE)
        currencyModuleService = appContainer.resolve(
          ModuleRegistrationName.CURRENCY
        )
        remoteQuery = appContainer.resolve("remoteQuery")
      })

      it("should query store and default currency with remote query", async () => {
        const store = await storeModuleService.create({
          name: "Store",
          default_currency_code: "usd",
          supported_currency_codes: ["usd"],
        })

        const stores = await remoteQuery({
          store: {
            fields: ["id"],
            default_currency: {
              fields: ["code"],
            },
          },
        })

        expect(stores).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: store.id,
              default_currency: expect.objectContaining({ code: "usd" }),
            }),
          ])
        )
      })
    })
  },
})
