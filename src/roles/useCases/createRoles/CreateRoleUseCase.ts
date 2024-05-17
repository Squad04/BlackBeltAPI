import { Role } from "@roles/entities/Role";
import { AppError } from "@shared/errors/AppError";
import {
  IRolesRepository,
  CreateRoleDTO,
} from "@roles/repositories/IRolesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateRoleUseCase {
  constructor(
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({ name }: CreateRoleDTO): Promise<Role> {
    const roleAlreadyExists = await this.rolesRepository.findByName(name);
    if (roleAlreadyExists) {
      throw new AppError("Role already exists");
    }

    return await this.rolesRepository.create({ name });
  }
}
