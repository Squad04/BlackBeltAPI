import { asyncHandler } from "@shared/errors/AsyncErrorHandler";
import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { UpdateProfileUseCase } from "./UpdateProfileUseCase";
import { UserMap } from "@users/dto/UserDTO";

export class UpdateProfileController {
  handle = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const updateProfileUseCase = container.resolve(UpdateProfileUseCase);

        const { id } = req.user;
        const { name, email, password, oldPassword } = req.body;

        const user = await updateProfileUseCase.execute({
          id,
          name,
          email,
          password,
          oldPassword,
        });

        return res.json(UserMap.toDTO(user));
      } catch (error) {
        next(error);
      }
    },
  );
}
