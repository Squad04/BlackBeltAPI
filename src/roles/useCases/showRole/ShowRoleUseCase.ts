import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { Role } from "@roles/entities/Role";
import { IRolesRepository } from "@roles/repositories/IRolesRepository";

@injectable()
export class ShowRoleUseCase {
  constructor(
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,
  ) {}

  async execute(id: string): Promise<Role> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new AppError("Role not found", 404);
    }

    return role;
  }
}
