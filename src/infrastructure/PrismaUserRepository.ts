import { PrismaClient } from "@prisma/client";

import { User, UserCreateDTO, UserUpdateDTO } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(user: UserCreateDTO): Promise<User> {
    const { name, email, password } = { ...user };

    try {
      const newUser = await this.db.user.create({
        data: {
          name,
          email,
          password
        }
      });

      return newUser;
    } catch (error) {
      return Promise.reject();
    }
  }

  async getById(id: bigint): Promise<User | null> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          id
        }
      });

      return user;
    } catch (error) {
      return Promise.reject();
    }
  }

  async getByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          email
        }
      });

      return user;
    } catch (error) {
      return Promise.reject();
    }
  }

  async edit(id: bigint, partialUser: UserUpdateDTO): Promise<User> {
    const { name, password } = { ...partialUser };

    try {
      const user = await this.db.user.update({
        where: {
          id
        },
        data: {
          name,
          password
        }
      });

      return user;
    } catch (error) {
      return Promise.reject();
    }
  }

  async delete(id: bigint): Promise<User> {
    try {
      const user = await this.db.user.delete({
        where: {
          id
        }
      });

      return user;
    } catch (error) {
      return Promise.reject();
    }
  }
}
