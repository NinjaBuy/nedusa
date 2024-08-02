import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { IAuthModuleService } from "@ninjajs/types"
import jwt from "jsonwebtoken"
import { getContainer } from "../environment-helpers/use-container"
import adminSeeder from "./admin-seeder"

export const adminHeaders = {
  headers: { "x-ninja-access-token": "test_token" },
}

export const createAdminUser = async (
  dbConnection,
  adminHeaders,
  container?
) => {
  const { password_hash } = await adminSeeder(dbConnection)
  const appContainer = container ?? getContainer()!

  const authModule: IAuthModuleService = appContainer.resolve(
    ModuleRegistrationName.AUTH
  )
  if (authModule) {
    const authUser = await authModule.create({
      provider: "emailpass",
      entity_id: "admin@ninja.js",
      scope: "admin",
      app_metadata: {
        user_id: "admin_user",
      },
      provider_metadata: {
        password: password_hash,
      },
    })

    const token = jwt.sign(authUser, "test")
    adminHeaders.headers["authorization"] = `Bearer ${token}`
  }
}
