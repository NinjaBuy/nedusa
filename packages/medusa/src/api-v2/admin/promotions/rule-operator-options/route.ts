import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../../types/routing"
import { operatorsMap } from "../utils"

export const GET = async (
  req: AuthenticatedNinjaRequest,
  res: NinjaResponse
) => {
  res.json({
    operators: Object.values(operatorsMap),
  })
}
