export class UserEmailAlreadyExistError extends Error {
  constructor(msg?: string) {
    super(msg);
    this.name = "UserEmailAlreadyExistError";
  }
}
