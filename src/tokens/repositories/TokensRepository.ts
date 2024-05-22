import { PrismaClient, Token } from "@prisma/client";
import { CreateTokenDTO, ITokensRepository } from "./ITokensRepository";
import { singleton } from "tsyringe";

@singleton()
export class TokensRepository implements ITokensRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create({ token, expiresAt, userId }: CreateTokenDTO): Promise<Token> {
    const userToken = await this.prisma.token.create({
      data: {
        token,
        expiresAt,
        userId,
      },
    });

    return userToken;
  }

  async findByToken(token: string): Promise<Token | undefined> {
    const userToken = await this.prisma.token.findUnique({
      where: {
        token,
      },
    });

    return userToken || undefined;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.token.delete({
      where: {
        id,
      },
    });
  }
}
