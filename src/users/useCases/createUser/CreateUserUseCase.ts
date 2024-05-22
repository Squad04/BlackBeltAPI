import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateUserDTO, UserResponseDTO, UserMap } from "@users/dto/UserDTO";
import { hash } from "bcryptjs";
import { IRolesRepository } from "@roles/repositories/IRolesRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    roleId,
    isAdmin = false,
  }: CreateUserDTO): Promise<UserResponseDTO> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    let role;

    if (roleId) {
      role = await this.rolesRepository.findById(roleId);
    } else {
      role = await this.rolesRepository.findByName("user");
    }

    if (!role) {
      throw new AppError("Role not found");
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      roleId: role.id,
      isAdmin,
    });

    return UserMap.toDTO({
      ...user,
      role,
    });
  }
}
