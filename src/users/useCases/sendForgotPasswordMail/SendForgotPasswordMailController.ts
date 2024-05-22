import { asyncHandler } from "@shared/errors/AsyncErrorHandler";
import { NextFunction, Request, Response } from "express";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import { container } from "tsyringe";

export class SendForgotPasswordMailController {
  handle = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const sendForgotPasswordMailUseCase = container.resolve(
          SendForgotPasswordMailUseCase,
        );

        const { email } = req.body;

        await sendForgotPasswordMailUseCase.execute(email);

        return res.status(200).send();
      } catch (error) {
        next(error);
      }
    },
  );
}
