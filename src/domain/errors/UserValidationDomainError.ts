class UserValidationDomainError extends Error {
  readonly name: string = "UserValidationDomainError"
  constructor(
    readonly message: string,
    readonly errors: { field: string; message: string }[],
  ) {
    super(message);
  }
}
