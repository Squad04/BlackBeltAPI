import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import jwtConfig from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { LoginDTO, LoginResponseDTO, UserMap } from "@users/dto/UserDTO";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { sign } from "jsonwebtoken";

@injectable()
export class CreateLoginUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const token = sign({}, jwtConfig.jwt.secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
    });

    return {
      user: UserMap.toDTO(user),
      token,
    };
  }
}
