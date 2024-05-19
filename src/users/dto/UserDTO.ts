export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  roleId?: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export type LoginResponseDTO = {
  user: UserResponseDTO;
  token: string;
};

export type UserResponseDTO = {
  id?: string;
  name: string;
  email: string;
  role?: {
    name: string;
  };
  createdAt?: Date;
  updatedAt: Date;
};

export class UserMap {
  static toDTO({
    id,
    name,
    email,
    role,
    createdAt,
    updatedAt,
  }: UserResponseDTO): UserResponseDTO {
    return {
      id,
      name,
      email,
      role: {
        name: role.name,
      },
      createdAt,
      updatedAt,
    };
  }
}
