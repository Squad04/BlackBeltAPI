import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { asyncHandler } from "@shared/errors/AsyncErrorHandler";
import { CreateRoleUseCase } from "./CreateRoleUseCase";

export class CreateRoleController {
  handle = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const createRoleUseCase = container.resolve(CreateRoleUseCase);

        const { name } = req.body;
        const role = await createRoleUseCase.execute({ name });

        return res.status(201).json(role);
      } catch (error) {
        next(error);
      }
    },
  );
}
