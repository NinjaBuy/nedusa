import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { AuthenticationInput, IAuthModuleService } from "@ninjajs/types"
import { NinjaError } from "@ninjajs/utils"
import jwt from "jsonwebtoken"
import { NinjaRequest, NinjaResponse } from "../../../../types/routing"

export const GET = async (req: NinjaRequest, res: NinjaResponse) => {
  const { scope, auth_provider } = req.params

  const service: IAuthModuleService = req.scope.resolve(
    ModuleRegistrationName.AUTH
  )

  const authData = {
    url: req.url,
    headers: req.headers,
    query: req.query,
    body: req.body,
    authScope: scope,
    protocol: req.protocol,
  } as AuthenticationInput

  const authResult = await service.authenticate(auth_provider, authData)

  const { success, error, authUser, location } = authResult

  if (location) {
    res.redirect(location)
    return
  }

  if (success) {
    const { jwt_secret } = req.scope.resolve("configModule").projectConfig
    const token = jwt.sign(authUser, jwt_secret)

    return res.status(200).json({ token })
  }

  throw new NinjaError(
    NinjaError.Types.UNAUTHORIZED,
    error || "Authentication failed"
  )
}

export const POST = async (req: NinjaRequest, res: NinjaResponse) => {
  await GET(req, res)
}
