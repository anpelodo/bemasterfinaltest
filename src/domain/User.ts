export class User {
  constructor(
    readonly id: bigint,
    readonly email: string,
    readonly name: string,
    readonly created_at: Date,
    readonly password: string
  ) {}

  static toPrimitives(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
      password: user.password
    };
  }

  static toSafePrimitives(user: User): UserReturn {
    const returnObj = {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at
    };

    return { ...returnObj };
  }
}

export type UserCreateDTO = Omit<User, "id" | "created_at">;
export type UserUpdateDTO = Partial<Pick<User, "name" | "password">>;

export type UserReturn = Omit<User, "password">;
