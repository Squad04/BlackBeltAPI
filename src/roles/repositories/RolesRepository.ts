import { PrismaClient } from "@prisma/client";
import { Role } from "@roles/entities/Role";
import { AppError } from "@shared/errors/AppError";

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
    try {
      const role = await this.prisma.role.create({
        data: {
          name,
        },
      });

      return role;
    } catch (error) {
      console.error("Erro ao criar um papel:", error);
      throw new AppError("Erro interno do servidor", 500);
    }
  }

  async findAll(): Promise<Role[]> {
    try {
      return await this.prisma.role.findMany();
    } catch (error) {
      console.error("Erro ao encontrar todos os papéis:", error);
      throw new AppError("Erro interno do servidor", 500);
    }
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
