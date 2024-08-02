import { ninjaIntegrationTestRunner } from "ninja-test-utils"
import { createAdminUser } from "../../../../helpers/create-admin-user"

jest.setTimeout(50000)

const env = { NINJA_FF_NINJA_V2: true }
const adminHeaders = {
  headers: { "x-ninja-access-token": "test_token" },
}

ninjaIntegrationTestRunner({
  env,
  testSuite: ({ dbConnection, api, getContainer }) => {
    describe("Currency - Admin", () => {
      let container

      beforeEach(async () => {
        container = getContainer()
        await createAdminUser(dbConnection, adminHeaders, container)
      })

      it("should correctly retrieve and list currencies", async () => {
        const listResp = await api.get("/admin/currencies", adminHeaders)

        expect(listResp.data.currencies).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              code: "aud",
            }),
            expect.objectContaining({
              code: "cad",
            }),
          ])
        )

        const retrieveResp = await api.get(
          `/admin/currencies/aud`,
          adminHeaders
        )
        expect(retrieveResp.data.currency).toEqual(
          listResp.data.currencies.find((c) => c.code === "aud")
        )
      })

      it("should correctly list currencies in the correct order", async () => {
        const listResp = await api.get(
          "/admin/currencies?order=-code",
          adminHeaders
        )

        const first = listResp.data.currencies.shift()
        expect(first).toEqual(
          expect.objectContaining({ code: "zwl", name: "Zimbabwean Dollar" })
        )
      })

      it("should allow for searching of currencies", async () => {
        const listResp = await api.get(
          "/admin/currencies?q=zimbabwean",
          adminHeaders
        )

        expect(listResp.data.currencies).toHaveLength(1)
        expect(listResp.data.currencies[0]).toEqual(
          expect.objectContaining({ code: "zwl", name: "Zimbabwean Dollar" })
        )
      })
    })
  },
})
