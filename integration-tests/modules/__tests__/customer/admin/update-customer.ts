import { ICustomerModuleService } from "@ninjajs/types"
import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { createAdminUser } from "../../../../helpers/create-admin-user"
import { ninjaIntegrationTestRunner } from "ninja-test-utils"

jest.setTimeout(50000)

const env = { NINJA_FF_NINJA_V2: true }
const adminHeaders = {
  headers: { "x-ninja-access-token": "test_token" },
}

ninjaIntegrationTestRunner({
  env,
  testSuite: ({ dbConnection, getContainer, api }) => {
    describe("POST /admin/customers/:id", () => {
      let appContainer
      let customerModuleService: ICustomerModuleService

      beforeAll(async () => {
        appContainer = getContainer()
        customerModuleService = appContainer.resolve(
          ModuleRegistrationName.CUSTOMER
        )
      })

      beforeEach(async () => {
        await createAdminUser(dbConnection, adminHeaders, appContainer)
      })

      it("should update a customer", async () => {
        const customer = await customerModuleService.create({
          first_name: "John",
          last_name: "Doe",
        })

        const response = await api.post(
          `/admin/customers/${customer.id}`,
          {
            first_name: "Jane",
          },
          adminHeaders
        )

        expect(response.status).toEqual(200)
        expect(response.data.customer).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            first_name: "Jane",
            last_name: "Doe",
          })
        )
      })
    })
  },
})
