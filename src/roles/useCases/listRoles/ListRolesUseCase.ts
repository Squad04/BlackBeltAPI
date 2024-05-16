import { Role } from "@roles/entities/Role";
import { RolesRepository } from "@roles/repositories/RolesRepository";

export class ListRolesUseCase {
  constructor(private rolesRepository: RolesRepository) {}

  async execute(): Promise<Role[]> {
    const roles = await this.rolesRepository.findAll();

    return roles;
  }
}
