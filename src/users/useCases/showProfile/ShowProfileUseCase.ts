import { AppError } from "@shared/errors/AppError";
import { UserMap } from "@users/dto/UserDTO";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

type ShowProfileParams = {
  userId: string;
};

@injectable()
export class ShowProfileUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
  ) {}

  async execute({ userId }: ShowProfileParams) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return UserMap.toDTO(user);
  }
}
