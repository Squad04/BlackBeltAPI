import { CreateUserDTO } from "@users/dto/UserDTO";
import { User } from "@users/entities/User";

export interface IUsersRepository {
  create({ name, email, password, roleId }: CreateUserDTO): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
