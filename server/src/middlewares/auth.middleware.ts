import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Unauthorized access"
      );
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId).select(
      "-password"
    );

    if (!user) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        "User not found"
      );
    }

    req.user = user;

    next();
  } catch (_error) {
    next(
      new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Unauthorized access"
      )
    );
  }
};