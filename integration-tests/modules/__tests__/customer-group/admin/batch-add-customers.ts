import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { ICustomerModuleService } from "@ninjajs/types"
import { ninjaIntegrationTestRunner } from "ninja-test-utils"
import { createAdminUser } from "../../../../helpers/create-admin-user"

jest.setTimeout(50000)

const env = { NINJA_FF_NINJA_V2: true }
const adminHeaders = {
  headers: { "x-ninja-access-token": "test_token" },
}

ninjaIntegrationTestRunner({
  env,
  testSuite: ({ dbConnection, getContainer, api }) => {
    describe("POST /admin/customer-groups/:id/customers", () => {
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

      it("should batch add customers to a group", async () => {
        const group = await customerModuleService.createCustomerGroup({
          name: "VIP",
        })
        const customers = await customerModuleService.create([
          {
            first_name: "Test",
            last_name: "Test",
          },
          {
            first_name: "Test2",
            last_name: "Test2",
          },
          {
            first_name: "Test3",
            last_name: "Test3",
          },
        ])

        const response = await api.post(
          `/admin/customer-groups/${group.id}/customers`,
          {
            add: customers.map((c) => c.id),
          },
          adminHeaders
        )

        expect(response.status).toEqual(200)

        const updatedGroup = await customerModuleService.retrieveCustomerGroup(
          group.id,
          {
            relations: ["customers"],
          }
        )
        expect(updatedGroup.customers?.length).toEqual(3)
      })
    })
  },
})
