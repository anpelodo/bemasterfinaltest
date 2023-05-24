import { User, UserReturn, UserUpdateDTO } from "../domain/User";
import { UserDoesntExistError } from "../domain/UserDoesntExistError";
import { UserRepository } from "../domain/UserRepository";

export class UserCrud {
  constructor(private readonly userRepo: UserRepository) {}

  async edit(id: bigint, updateUser: UserUpdateDTO): Promise<UserReturn> {
    const user = await this.userRepo.edit(id, updateUser);
    return User.toSafePrimitives(user);
  }

  async delete(id: bigint): Promise<UserReturn> {
    const user = await this.userRepo.delete(id);
    return User.toSafePrimitives(user);
  }

  async getById(id: bigint): Promise<UserReturn> {
    const user = await this.userRepo.getById(id);

    if (!user) {
      throw new UserDoesntExistError("on UserCrud.getById()");
    }

    return User.toSafePrimitives(user);
  }

  async getByEmail(email: string): Promise<UserReturn> {
    const user = await this.userRepo.getByEmail(email);

    if (!user) {
      throw new UserDoesntExistError("on UserCrud.getByEmail");
    }

    return User.toSafePrimitives(user);
  }
}
