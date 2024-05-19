import { AppError } from "@shared/errors/AppError";
import { UpdateUserDTO } from "@users/dto/UserDTO";
import { User } from "@users/entities/User";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { compare, hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    id,
    name,
    email,
    password,
    oldPassword,
  }: UpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email);
    if (userUpdateEmail && userUpdateEmail.id !== id) {
      throw new AppError("Email already in use");
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);

      if (!checkOldPassword) {
        throw new AppError("Old password does not match");
      }

      user.password = await hash(password, 10);
    }

    user.name = name;
    user.email = email;

    return await this.usersRepository.update(user);
  }
}
