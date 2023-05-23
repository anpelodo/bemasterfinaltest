import { User, UserCreateDTO, UserUpdateDTO } from "./User";

export interface UserRepository {
  create(user: UserCreateDTO): Promise<User>;
  getById(id: bigint): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  edit(id: bigint, userUpdate: UserUpdateDTO): Promise<User>;
  delete(id: bigint): Promise<User>;
}
