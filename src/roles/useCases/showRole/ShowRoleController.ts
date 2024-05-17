import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { asyncHandler } from "@shared/errors/AsyncErrorHandler";
import { ShowRoleUseCase } from "./ShowRoleUseCase";

export class ShowRoleController {
  handle = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;

        const showRoleUseCase = container.resolve(ShowRoleUseCase);
        const role = await showRoleUseCase.execute(id);

        return res.status(200).json(role);
      } catch (error) {
        next(error);
      }
    },
  );
}
