import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { asyncHandler } from "@shared/errors/AsyncErrorHandler";
import { ListRolesUseCase } from "./ListRolesUseCase";

export class ListRolesController {
  handle = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const listRolesUseCase = container.resolve(ListRolesUseCase);

        const roles = await listRolesUseCase.execute();

        return res.status(200).json(roles);
      } catch (error) {
        next(error);
      }
    },
  );
}
