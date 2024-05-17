import { asyncHandler } from "@shared/errors/AsyncErrorHandler";
import { Request, Response, NextFunction } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { container } from "tsyringe";

export class CreateUserController {
  handle = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const createUserUseCase = container.resolve(CreateUserUseCase);

        const { name, email, password, roleId } = req.body;

        const user = await createUserUseCase.execute({
          name,
          email,
          password,
          roleId,
        });

        return res.status(201).json(user);
      } catch (error) {
        next(error);
      }
    },
  );
}
