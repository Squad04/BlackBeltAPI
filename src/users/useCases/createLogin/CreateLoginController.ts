import { asyncHandler } from "@shared/errors/AsyncErrorHandler";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CreateLoginUseCase } from "./CreateLoginUseCase";

export class CreateLoginController {
  handle = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const createLoginUseCase = container.resolve(CreateLoginUseCase);

        const { email, password } = req.body;

        const { user, token } = await createLoginUseCase.execute({
          email,
          password,
        });

        return res.json({ user, token });
      } catch (error) {
        next(error);
      }
    },
  );
}
