import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

app.get("/api/health", (_req: Request, res: Response) => { res.status(200).json({
    success: true,
    message: "API is running",
  });
});

export default app;