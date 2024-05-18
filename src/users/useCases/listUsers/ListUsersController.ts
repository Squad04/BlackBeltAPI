import { asyncHandler } from "@shared/errors/AsyncErrorHandler";
import { Request, Response, NextFunction } from "express";
import { ListUsersUseCase } from "./ListUsersUseCase";
import { container } from "tsyringe";

export class ListUsersController {
  handle = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const listUsersUseCase = container.resolve(ListUsersUseCase);

        const users = await listUsersUseCase.execute();

        return res.status(200).json(users);
      } catch (error) {
        next(error);
      }
    },
  );
}
