import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { IFulfillmentModuleService } from "@ninjajs/types"
import { ninjaIntegrationTestRunner } from "ninja-test-utils/dist"
import { createAdminUser } from "../../../helpers/create-admin-user"

jest.setTimeout(100000)

const env = { NINJA_FF_NINJA_V2: true }
const adminHeaders = {
  headers: { "x-ninja-access-token": "test_token" },
}

ninjaIntegrationTestRunner({
  env,
  testSuite: ({ getContainer, api, dbConnection }) => {
    let service: IFulfillmentModuleService
    let container

    beforeAll(() => {
      container = getContainer()
      service = container.resolve(ModuleRegistrationName.FULFILLMENT)
    })

    beforeEach(async () => {
      await createAdminUser(dbConnection, adminHeaders, container)
    })

    describe("GET /admin/fulfillment-providers", () => {
      it("should list all fulfillment providers", async () => {
        const response = await api.get(
          `/admin/fulfillment-providers`,
          adminHeaders
        )

        expect(response.status).toEqual(200)
        expect(response.data.fulfillment_providers).toEqual([
          { id: "manual_test-provider", is_enabled: true },
        ])
      })
    })
  },
})
