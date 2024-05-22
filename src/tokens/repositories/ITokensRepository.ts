import { Token } from "../entities/Token";

export type CreateTokenDTO = {
  userId: string;
  token: string;
  expiresAt: Date;
};

export interface ITokensRepository {
  create({ userId, token, expiresAt }: CreateTokenDTO): Promise<Token>;
  findByToken(token: string): Promise<Token | undefined>;
  delete(token: string): Promise<void>;
}
