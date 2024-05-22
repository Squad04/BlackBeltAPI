import { asyncHandler } from "@shared/errors/AsyncErrorHandler";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

export class ResetPasswordController {
  handle = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { token } = req.query;
        const { password } = req.body;

        const resetPasswordService = container.resolve(ResetPasswordUseCase);
        await resetPasswordService.execute({
          token: token as string,
          password,
        });

        return res.status(204).send();
      } catch (error) {
        next(error);
      }
    },
  );
}
