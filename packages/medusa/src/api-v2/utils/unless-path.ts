import { NextFunction } from "express"
import { NinjaRequest, NinjaResponse } from "../../types/routing"
import { MiddlewareFunction } from "../../types/middlewares"

// Due to how our route loader works, where we load all middlewares before routes, ambiguous routes end up having all middlewares on different routes executed before the route handler is.
// This function allows us to skip middlewares for particular routes, so we can temporarily solve this without completely breaking the route loader for everyone.
export const unlessPath =
  (onPath: RegExp, middleware: MiddlewareFunction) =>
  (req: NinjaRequest, res: NinjaResponse, next: NextFunction) => {
    if (onPath.test(req.path)) {
      return next()
    } else {
      return middleware(req, res, next)
    }
  }
