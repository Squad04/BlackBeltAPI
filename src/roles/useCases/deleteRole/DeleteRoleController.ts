import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { asyncHandler } from "@shared/errors/AsyncErrorHandler";
import { DeleteRoleUseCase } from "./DeleteRoleUseCase";

export class DeleteRoleController {
  handle = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;

        const deleteRoleUseCase = container.resolve(DeleteRoleUseCase);
        await deleteRoleUseCase.execute(id);

        return res.status(204).send();
      } catch (error) {
        next(error);
      }
    },
  );
}
