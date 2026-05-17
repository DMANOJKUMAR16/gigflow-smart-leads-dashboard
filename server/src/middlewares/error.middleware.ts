import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const errorMiddleware = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode =
    error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",
    error: {
      statusCode,
    },
  });
};