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
    describe("POST /admin/customers/:id/addresses", () => {
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
      it("should create a customer address", async () => {
        // Create a customer
        const customer = await customerModuleService.create({
          first_name: "John",
          last_name: "Doe",
        })

        const response = await api.post(
          `/admin/customers/${customer.id}/addresses?fields=*addresses`,
          {
            first_name: "John",
            last_name: "Doe",
            address_1: "Test street 1",
          },
          adminHeaders
        )

        expect(response.status).toEqual(200)
        expect(response.data.customer.addresses).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              first_name: "John",
              last_name: "Doe",
              address_1: "Test street 1",
            }),
          ])
        )

        const customerWithAddresses = await customerModuleService.retrieve(
          customer.id,
          { relations: ["addresses"] }
        )

        expect(customerWithAddresses.addresses?.length).toEqual(1)
      })

      it("sets new shipping address as default and unsets the old one", async () => {
        const customer = await customerModuleService.create({
          first_name: "John",
          last_name: "Doe",
          addresses: [
            {
              first_name: "John",
              last_name: "Doe",
              address_1: "Test street 1",
              is_default_shipping: true,
            },
          ],
        })

        const response = await api.post(
          `/admin/customers/${customer.id}/addresses`,
          {
            first_name: "John",
            last_name: "Doe",
            address_1: "Test street 2",
            is_default_shipping: true,
          },
          adminHeaders
        )

        expect(response.status).toEqual(200)

        const [address] = await customerModuleService.listAddresses({
          customer_id: customer.id,
          is_default_shipping: true,
        })

        expect(address.address_1).toEqual("Test street 2")
      })

      it("sets new billing address as default and unsets the old one", async () => {
        const customer = await customerModuleService.create({
          first_name: "John",
          last_name: "Doe",
          addresses: [
            {
              first_name: "John",
              last_name: "Doe",
              address_1: "Test street 1",
              is_default_billing: true,
            },
          ],
        })

        const response = await api.post(
          `/admin/customers/${customer.id}/addresses`,
          {
            first_name: "John",
            last_name: "Doe",
            address_1: "Test street 2",
            is_default_billing: true,
          },
          adminHeaders
        )

        expect(response.status).toEqual(200)

        const [address] = await customerModuleService.listAddresses({
          customer_id: customer.id,
          is_default_billing: true,
        })

        expect(address.address_1).toEqual("Test street 2")
      })
    })
  },
})
