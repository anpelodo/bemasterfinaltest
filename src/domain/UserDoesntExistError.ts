export class UserDoesntExistError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "UserDoesntExistError";
  }
}
