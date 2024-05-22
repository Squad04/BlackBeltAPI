import { AppError } from "@shared/errors/AppError";
import { ITokensRepository } from "@tokens/repositories/ITokensRepository";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

type ResetPasswordParams = {
  token: string;
  password: string;
};

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("TokensRepository")
    private tokensRepository: ITokensRepository,
  ) {}

  async execute({ token, password }: ResetPasswordParams): Promise<void> {
    const userToken = await this.tokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("Token not found.");
    }

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = new Date();
    compareDate.setHours(compareDate.getHours() - 2);

    if (tokenCreatedAt <= compareDate) {
      throw new AppError("Token expired.");
    }

    const user = await this.usersRepository.findById(userToken.userId);

    if (!user) {
      throw new AppError("User does not exist.");
    }

    user.password = await hash(password, 10);

    await this.usersRepository.update(user);

    await this.tokensRepository.delete(userToken.id);
  }
}
