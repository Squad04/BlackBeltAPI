import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { routes } from "./routes";
import { AppError } from "@shared/errors/AppError";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../swagger.json";
import "@shared/container/dependencyInjection";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
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

export { app };
