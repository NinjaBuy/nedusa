import { IUserModuleService } from "@ninjajs/types"
import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { createAdminUser } from "../../../helpers/create-admin-user"
import { ninjaIntegrationTestRunner } from "ninja-test-utils"

jest.setTimeout(50000)

const env = { NINJA_FF_NINJA_V2: true }
const adminHeaders = {
  headers: { "x-ninja-access-token": "test_token" },
}

ninjaIntegrationTestRunner({
  env,
  testSuite: ({ dbConnection, getContainer, api }) => {
    describe("GET /admin/users", () => {
      let appContainer
      let userModuleService: IUserModuleService

      beforeAll(async () => {
        appContainer = getContainer()
        userModuleService = appContainer.resolve(ModuleRegistrationName.USER)
      })

      beforeEach(async () => {
        await createAdminUser(dbConnection, adminHeaders, appContainer)
      })

      it("should list users", async () => {
        await userModuleService.create([
          {
            email: "member@test.com",
          },
        ])

        const response = await api.get(`/admin/users`, adminHeaders)

        expect(response.status).toEqual(200)
        expect(response.data).toEqual({
          users: expect.arrayContaining([
            expect.objectContaining({
              email: "admin@ninja.js",
            }),
            expect.objectContaining({ email: "member@test.com" }),
          ]),
          count: 2,
          offset: 0,
          limit: 50,
        })
      })
    })
  },
})
