import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IRolesRepository } from "@roles/repositories/IRolesRepository";

@injectable()
export class DeleteRoleUseCase {
  constructor(
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new AppError("Role not found", 404);
    }

    await this.rolesRepository.delete(id);
  }
}
