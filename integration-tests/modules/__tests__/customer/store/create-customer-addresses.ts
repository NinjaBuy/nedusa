import { ICustomerModuleService } from "@ninjajs/types"
import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { createAuthenticatedCustomer } from "../../../helpers/create-authenticated-customer"
import { ninjaIntegrationTestRunner } from "ninja-test-utils"

jest.setTimeout(50000)

const env = { NINJA_FF_NINJA_V2: true }

ninjaIntegrationTestRunner({
  env,
  testSuite: ({ dbConnection, getContainer, api }) => {
    describe("POST /store/customers/me/addresses", () => {
      let appContainer
      let customerModuleService: ICustomerModuleService

      beforeAll(async () => {
        appContainer = getContainer()
        customerModuleService = appContainer.resolve(
          ModuleRegistrationName.CUSTOMER
        )
      })

      it("should create a customer address", async () => {
        const { customer, jwt } = await createAuthenticatedCustomer(
          appContainer
        )

        const response = await api.post(
          `/store/customers/me/addresses`,
          {
            first_name: "John",
            last_name: "Doe",
            address_1: "Test street 1",
          },
          { headers: { authorization: `Bearer ${jwt}` } }
        )

        expect(response.status).toEqual(200)
        expect(response.data.address).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            first_name: "John",
            last_name: "Doe",
            address_1: "Test street 1",
            customer_id: customer.id,
          })
        )

        const customerWithAddresses = await customerModuleService.retrieve(
          customer.id,
          { relations: ["addresses"] }
        )

        expect(customerWithAddresses.addresses?.length).toEqual(1)
      })
    })
  },
})
