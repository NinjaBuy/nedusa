import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../types/routing"

export const POST = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  req.session.auth_user = req.auth

  res.status(200).json({ user: req.auth })
}
