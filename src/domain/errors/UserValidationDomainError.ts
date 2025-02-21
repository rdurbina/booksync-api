class UserValidationDomainError extends Error {
  readonly name: string = "UserValidationDomainError";
  constructor(
    readonly message: string,
    readonly errors: Error[]
  ) {
    super(message);
  }
}
