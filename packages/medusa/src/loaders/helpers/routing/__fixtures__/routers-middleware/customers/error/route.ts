import { Request, Response } from "express"
import { NinjaError } from "ninja-core-utils"

export const GET = async (req: Request, res: Response) => {
  throw new NinjaError(NinjaError.Types.NOT_ALLOWED, "Not allowed")
}
