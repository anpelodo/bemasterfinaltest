export class User {
  constructor(
    readonly id: bigint,
    readonly email: string,
    readonly name: string,
    readonly created_at: Date
  ) {}
}

export type UserRepo = User & { password: string };

export type UserCreateDTO = Omit<UserRepo, "id" | "created_at">;
export type UserUpdateDTO = Partial<Pick<UserRepo, "name" | "password">>;
