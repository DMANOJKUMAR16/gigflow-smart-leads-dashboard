import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { AuthRequest } from "./auth.middleware";
import { ApiError } from "../utils/ApiError";

export const authorizeRoles =
  (...roles: string[]) =>
  (
    req: AuthRequest,
    _res: Response,
    next: NextFunction
  ) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ApiError(
          StatusCodes.FORBIDDEN,
          "Access denied"
        )
      );
    }

    next();
  };