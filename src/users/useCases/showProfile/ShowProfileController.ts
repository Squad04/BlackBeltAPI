import { asyncHandler } from "@shared/errors/AsyncErrorHandler";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ShowProfileUseCase } from "./ShowProfileUseCase";

export class ShowProfileController {
  handle = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const showProfileUseCase = container.resolve(ShowProfileUseCase);

        const { id } = req.user;

        const user = showProfileUseCase.execute({ userId: id });

        return res.json(user);
      } catch (error) {
        next(error);
      }
    },
  );
}
