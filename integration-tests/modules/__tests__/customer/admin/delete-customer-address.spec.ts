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
    describe("DELETE /admin/customers/:id/addresses/:address_id", () => {
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

      it("should update a customer address", async () => {
        const customer = await customerModuleService.create({
          first_name: "John",
          last_name: "Doe",
        })

        const address = await customerModuleService.addAddresses({
          customer_id: customer.id,
          first_name: "John",
          last_name: "Doe",
          address_1: "Test street 1",
        })

        const response = await api.delete(
          `/admin/customers/${customer.id}/addresses/${address.id}`,
          adminHeaders
        )

        expect(response.status).toEqual(200)

        const updatedCustomer = await customerModuleService.retrieve(
          customer.id,
          {
            relations: ["addresses"],
          }
        )

        expect(updatedCustomer.addresses?.length).toEqual(0)
      })
    })
  },
})
