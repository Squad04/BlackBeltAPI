import { Role } from "@roles/entities/Role";

export type CreateRoleDTO = {
  name: string;
};

export interface IRolesRepository {
  create({ name }: CreateRoleDTO): Promise<Role>;
  findAll(): Promise<Role[]>;
  findByName(name: string): Promise<Role>;
}
