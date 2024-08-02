import { NinjaError } from "@ninjajs/utils"
import { NextFunction } from "express"
import { z, ZodError } from "zod"
import { NinjaRequest, NinjaResponse } from "../../types/routing"

export async function zodValidator<T>(
  zodSchema: z.ZodObject<any, any> | z.ZodEffects<any, any>,
  body: T
): Promise<z.ZodRawShape> {
  try {
    return await zodSchema.parseAsync(body)
  } catch (err) {
    if (err instanceof ZodError) {
      throw new NinjaError(
        NinjaError.Types.INVALID_DATA,
        `Invalid request body: ${JSON.stringify(err.errors)}`
      )
    }

    throw err
  }
}

export function validateAndTransformBody(
  zodSchema: z.ZodObject<any, any> | z.ZodEffects<any, any>
): (
  req: NinjaRequest,
  res: NinjaResponse,
  next: NextFunction
) => Promise<void> {
  return async (req: NinjaRequest, _: NinjaResponse, next: NextFunction) => {
    try {
      req.validatedBody = await zodValidator(zodSchema, req.body)
      next()
    } catch (e) {
      next(e)
    }
  }
}
