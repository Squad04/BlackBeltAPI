import { Role } from "@roles/entities/Role";
import { RolesRepository } from "@roles/repositories/RolesRepository";
import { AppError } from "@shared/errors/AppError";

type CreateRoleDTO = {
  name: string;
};

export class CreateRoleUseCase {
  constructor(private rolesRepository: RolesRepository) {}

  async execute({ name }: CreateRoleDTO): Promise<Role> {
    try {
      const roleAlreadyExists = await this.rolesRepository.findByName(name);
      if (roleAlreadyExists) {
        throw new AppError("Role already exists");
      }

      return await this.rolesRepository.create({ name });
    } catch (error) {
      console.error("Erro ao criar um papel:", error);
      throw new AppError("Erro interno do servidor", 500);
    }
  }
}
