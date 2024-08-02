import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { AuthenticationInput, IAuthModuleService } from "@ninjajs/types"
import { NinjaError } from "@ninjajs/utils"
import jwt from "jsonwebtoken"
import { NinjaRequest, NinjaResponse } from "../../../../../types/routing"

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

  const authResult = await service.validateCallback(auth_provider, authData)

  const { success, error, authUser, successRedirectUrl } = authResult

  if (success) {
    const { jwt_secret } = req.scope.resolve("configModule").projectConfig

    const token = jwt.sign(authUser, jwt_secret)

    if (successRedirectUrl) {
      const url = new URL(successRedirectUrl!)
      url.searchParams.append("access_token", token)

      return res.redirect(url.toString())
    }

    return res.json({ token })
  }

  throw new NinjaError(
    NinjaError.Types.UNAUTHORIZED,
    error || "Authentication failed"
  )
}

export const POST = async (req: NinjaRequest, res: NinjaResponse) => {
  await GET(req, res)
}
