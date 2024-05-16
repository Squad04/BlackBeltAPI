import { NextFunction, Request, Response } from "express";
import { CreateRoleUseCase } from "./CreateRoleUseCase";
import { asyncHandler } from "@shared/errors/AsyncErrorHandler";

export class CreateRoleController {
  constructor(private createRoleUseCase: CreateRoleUseCase) {}

  handle = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { name } = req.body;
        const role = await this.createRoleUseCase.execute({ name });
        return res.status(201).json(role);
      } catch (error) {
        next(error);
      }
    },
  );
}
