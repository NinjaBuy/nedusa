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
    describe("POST /admin/users/:id", () => {
      let appContainer
      let userModuleService: IUserModuleService

      beforeAll(async () => {
        appContainer = getContainer()
        userModuleService = appContainer.resolve(ModuleRegistrationName.USER)
      })

      beforeEach(async () => {
        await createAdminUser(dbConnection, adminHeaders, appContainer)
      })

      it("should update a single user", async () => {
        const user = await userModuleService.create({
          email: "member@test.com",
        })

        const body = {
          first_name: "John",
          last_name: "Doe",
        }
        const response = await api.post(
          `/admin/users/${user.id}`,
          body,
          adminHeaders
        )

        expect(response.status).toEqual(200)
        expect(response.data.user).toEqual(expect.objectContaining(body))
      })
    })
  },
})
