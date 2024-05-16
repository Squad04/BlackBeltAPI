import { PrismaClient } from "@prisma/client";
import { Role } from "@roles/entities/Role";

type CreateRoleDTO = {
  name: string;
};

export class RolesRepository {
  private prisma: PrismaClient;

  private static INSTANCE: RolesRepository;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance(): RolesRepository {
    if (!RolesRepository.INSTANCE) {
      RolesRepository.INSTANCE = new RolesRepository();
    }

    return RolesRepository.INSTANCE;
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

  async findByName(name: string): Promise<Role | undefined> {
    const role = await this.prisma.role.findUnique({
      where: {
        name,
      },
    });

    return role;
  }
}
