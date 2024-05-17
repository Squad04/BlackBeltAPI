import { PrismaClient } from "@prisma/client";
import { Role } from "@roles/entities/Role";
import { singleton } from "tsyringe";
import { IRolesRepository, CreateRoleDTO } from "./IRolesRepository";

@singleton()
export class RolesRepository implements IRolesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create({ name }: CreateRoleDTO): Promise<Role> {
    const role = await this.prisma.role.create({
      data: {
        name,
      },
    });

    return role;
  }

  async findAll(): Promise<Role[]> {
    return await this.prisma.role.findMany();
  }

  async findById(id: string): Promise<Role | undefined> {
    const role = await this.prisma.role.findUnique({
      where: {
        id,
      },
    });

    return role;
  }

  async findByName(name: string): Promise<Role | undefined> {
    const role = await this.prisma.role.findUnique({
      where: {
        name,
      },
    });

    return role;
  }
}
