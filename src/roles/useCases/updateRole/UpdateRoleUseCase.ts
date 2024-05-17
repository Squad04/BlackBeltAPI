import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { Role } from "@roles/entities/Role";
import {
  IRolesRepository,
  UpdateRoleDTO,
} from "@roles/repositories/IRolesRepository";

@injectable()
export class UpdateRoleUseCase {
  constructor(
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({ id, name }: UpdateRoleDTO): Promise<Role> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new AppError("Role not found", 404);
    }

    const roleWithSameNameExists = await this.rolesRepository.findByName(name);

    if (roleWithSameNameExists && roleWithSameNameExists.id !== id) {
      throw new AppError("Another role with the same name already exists", 400);
    }

    role.name = name;

    return await this.rolesRepository.update(role);
  }
}
