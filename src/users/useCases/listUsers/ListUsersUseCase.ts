import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { UserResponseDTO, UserMap } from "@users/dto/UserDTO";

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<UserResponseDTO[]> {
    const users = await this.usersRepository.findAll();
    return users.map(user => UserMap.toDTO(user));
  }
}
