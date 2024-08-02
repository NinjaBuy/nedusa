import { ICustomerModuleService } from "@ninjajs/types"
import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { createAuthenticatedCustomer } from "../../../helpers/create-authenticated-customer"
import { ninjaIntegrationTestRunner } from "ninja-test-utils"

const env = { NINJA_FF_NINJA_V2: true }

jest.setTimeout(50000)

ninjaIntegrationTestRunner({
  env,
  testSuite: ({ dbConnection, getContainer, api }) => {
    describe("DELETE /store/customers/me/addresses/:address_id", () => {
      let appContainer
      let customerModuleService: ICustomerModuleService

      beforeAll(async () => {
        appContainer = getContainer()
        customerModuleService = appContainer.resolve(
          ModuleRegistrationName.CUSTOMER
        )
      })

      it("should delete a customer address", async () => {
        const { customer, jwt } = await createAuthenticatedCustomer(
          appContainer
        )

        const address = await customerModuleService.addAddresses({
          customer_id: customer.id,
          first_name: "John",
          last_name: "Doe",
          address_1: "Test street 1",
        })

        const response = await api.delete(
          `/store/customers/me/addresses/${address.id}`,
          { headers: { authorization: `Bearer ${jwt}` } }
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

      it("should fail to delete another customer's address", async () => {
        const { jwt } = await createAuthenticatedCustomer(appContainer)

        const otherCustomer = await customerModuleService.create({
          first_name: "Jane",
          last_name: "Doe",
        })
        const address = await customerModuleService.addAddresses({
          customer_id: otherCustomer.id,
          first_name: "John",
          last_name: "Doe",
          address_1: "Test street 1",
        })

        const response = await api
          .delete(`/store/customers/me/addresses/${address.id}`, {
            headers: { authorization: `Bearer ${jwt}` },
          })
          .catch((e) => e.response)

        expect(response.status).toEqual(404)
      })
    })
  },
})
