import { PrismaClient } from "@prisma/client";
import { IUsersRepository } from "./IUsersRepository";
import { User } from "@users/entities/User";
import { CreateUserDTO } from "@users/dto/UserDTO";
import { singleton } from "tsyringe";

@singleton()
export class UsersRepository implements IUsersRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create({
    name,
    email,
    password,
    roleId,
  }: CreateUserDTO): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        roleId,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    return user;
  }
}
