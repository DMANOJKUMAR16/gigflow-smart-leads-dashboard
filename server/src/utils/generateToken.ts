import jwt from "jsonwebtoken";
import { env } from "../config/env";

const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};

export default generateToken;