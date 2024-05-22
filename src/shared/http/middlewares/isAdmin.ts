import { Request, Response, NextFunction } from "express";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@users/repositories/UsersRepository";
import { container } from "tsyringe";
import { asyncHandler } from "@shared/errors/AsyncErrorHandler";

export const isAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user;

      const usersRepository = container.resolve(UsersRepository);
      const user = await usersRepository.findById(id);

      if (!user.isAdmin) {
        throw new AppError(
          "User does not have permission to perform this action",
          403,
        );
      }

      return next();
    } catch (error) {
      next(error);
    }
  },
);
