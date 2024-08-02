import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { ICartModuleService, IRegionModuleService } from "@ninjajs/types"
import { ninjaIntegrationTestRunner } from "ninja-test-utils"

jest.setTimeout(50000)

const env = { NINJA_FF_NINJA_V2: true }

ninjaIntegrationTestRunner({
  env,
  testSuite: ({ dbConnection, getContainer, api }) => {
    describe("Link: Cart Region", () => {
      let appContainer
      let cartModuleService: ICartModuleService
      let regionModule: IRegionModuleService
      let remoteQuery

      beforeAll(async () => {
        appContainer = getContainer()
        cartModuleService = appContainer.resolve(ModuleRegistrationName.CART)
        regionModule = appContainer.resolve(ModuleRegistrationName.REGION)
        remoteQuery = appContainer.resolve("remoteQuery")
      })

      it("should query carts and regions with remote query", async () => {
        const region = await regionModule.create({
          name: "Region",
          currency_code: "usd",
        })

        const cart = await cartModuleService.create({
          email: "tony@stark.com",
          currency_code: "usd",
          region_id: region.id,
        })

        const carts = await remoteQuery({
          cart: {
            fields: ["id"],
            region: {
              fields: ["id"],
            },
          },
        })

        const regions = await remoteQuery({
          region: {
            fields: ["id"],
            carts: {
              fields: ["id"],
            },
          },
        })

        expect(carts).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: cart.id,
              region: expect.objectContaining({ id: region.id }),
            }),
          ])
        )

        expect(regions).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: region.id,
              carts: expect.arrayContaining([
                expect.objectContaining({ id: cart.id }),
              ]),
            }),
          ])
        )
      })
    })
  },
})
