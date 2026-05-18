import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { asyncHandler } from "../utils/asyncHandler";
import { apiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";
import generateToken from "../utils/generateToken";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "User already exists"
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user._id.toString());

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(StatusCodes.CREATED)
      .json(
        apiResponse(true, "User registered successfully", {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        })
      );
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Invalid credentials"
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Invalid credentials"
      );
    }

    const token = generateToken(user._id.toString());

    res
      .cookie("token", token, {
        httpOnly: true,
        secure:
         process.env.NODE_ENV ===
         "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(StatusCodes.OK)
      .json(
        apiResponse(true, "Login successful", {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        })
      );
  }
);

export const logoutUser = asyncHandler(
  async (_req: Request, res: Response) => {
    res
      .clearCookie("token")
      .status(StatusCodes.OK)
      .json(apiResponse(true, "Logout successful"));
  }
);