type createCommentsProps = {
  id: bigint;
  comment: string;
  created_at: Date;
  deleted_at: Date | null;
  deleted: boolean;

  userId: bigint | null;
};
export class Comments {
  constructor(
    readonly id: bigint,
    readonly comment: string,
    readonly created_at: Date,
    readonly deleted_at: Date | null,
    readonly deleted: boolean,

    readonly userId: bigint | null
  ) {}

  static create({
    id,
    comment,
    created_at,
    deleted_at,
    deleted,
    userId
  }: createCommentsProps) {
    return new Comments(id, comment, created_at, deleted_at, deleted, userId);
  }
}
