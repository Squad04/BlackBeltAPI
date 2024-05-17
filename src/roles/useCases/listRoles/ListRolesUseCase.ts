import { Role } from "@roles/entities/Role";
import { IRolesRepository } from "@roles/repositories/IRolesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListRolesUseCase {
  constructor(
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,
  ) {}

  async execute(): Promise<Role[]> {
    const roles = await this.rolesRepository.findAll();

    return roles;
  }
}
