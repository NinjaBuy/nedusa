import { ninjaIntegrationTestRunner } from "ninja-test-utils/dist"

jest.setTimeout(50000)

const env = { NINJA_FF_NINJA_V2: true }

ninjaIntegrationTestRunner({
  env,
  testSuite: ({ dbConnection, getContainer, api }) => {
    describe("Payment Providers", () => {
      let appContainer

      beforeAll(async () => {
        appContainer = getContainer()
      })

      it("should list payment providers", async () => {
        let response = await api.get(`/admin/payments/payment-providers`)

        expect(response.status).toEqual(200)
        expect(response.data.payment_providers).toEqual([
          expect.objectContaining({
            id: "pp_system_default_2",
          }),
          expect.objectContaining({
            id: "pp_system_default",
          }),
        ])
        expect(response.data.count).toEqual(2)
      })
    })
  },
})
