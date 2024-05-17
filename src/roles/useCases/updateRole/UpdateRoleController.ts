import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { asyncHandler } from "@shared/errors/AsyncErrorHandler";
import { UpdateRoleUseCase } from "./UpdateRoleUseCase";

export class UpdateRoleController {
  handle = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const { name } = req.body;

        const updateRoleUseCase = container.resolve(UpdateRoleUseCase);
        const updatedRole = await updateRoleUseCase.execute({ id, name });

        return res.status(200).json(updatedRole);
      } catch (error) {
        next(error);
      }
    },
  );
}
