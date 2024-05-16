import { NextFunction, Request, Response } from "express";
import { ListRolesUseCase } from "./ListRolesUseCase";
import { asyncHandler } from "@shared/errors/AsyncErrorHandler";

export class ListRolesController {
  constructor(private listRolesUseCase: ListRolesUseCase) {}

  handle = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const roles = await this.listRolesUseCase.execute();

        return res.status(200).json(roles);
      } catch (error) {
        next(error);
      }
    },
  );
}
