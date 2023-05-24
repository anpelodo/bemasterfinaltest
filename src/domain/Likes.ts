import { User } from "./User";

type createLikesProps = { id: bigint; user: User | null };
export class Likes {
  id: bigint;
  user: User | null;

  constructor(id: bigint, user: User | null) {
    this.id = id;
    this.user = user;
  }

  static create({ id, user }: createLikesProps) {
    return new Likes(id, user);
  }
}
