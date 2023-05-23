import { User } from "./User";

export class Comments {
  constructor(
    readonly id: bigint,
    readonly comment: string,
    readonly created_at: Date,
    readonly deleted_at: Date | null,
    readonly deleted: boolean,

    readonly user: User | null
  ) {}
}
