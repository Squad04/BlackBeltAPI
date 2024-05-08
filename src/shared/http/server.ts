import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { routes } from "./routes";
import { AppError } from "@shared/errors/AppError";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(routes);
app.use((error: Error, req: Request, res: Response) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      error: error.message,
    });
  }

  console.log(error);

  return res.status(500).json({
    status: "error",
    error: "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
