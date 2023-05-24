import { Request, Response } from "express";

import { UserCrud } from "../application/UserCrud";
import { UserReturn } from "../domain/User";
import { UserDoesntExistError } from "../domain/UserDoesntExistError";

export class UserController {
  constructor(private readonly userCrud: UserCrud) {}

  async getUser(req: Request, res: Response) {
    const { id, email } = req.query;

    try {
      let user: UserReturn;
      switch (true) {
        case id !== undefined:
          user = await this.userCrud.getById(BigInt("" + id));
          break;

        case email !== undefined && email !== "":
          user = await this.userCrud.getByEmail("" + email);
          break;

        default:
          return res.sendStatus(400);
      }

      return res.status(200).json({
        ...user
      });
    } catch (err) {
      if (err instanceof UserDoesntExistError) {
        return res.status(404).send({
          message: "User Doesn't Exist"
        });
      }

      console.error(err);
      return res.sendStatus(500);
    }
  }

}
