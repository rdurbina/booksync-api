class UserValidationDomainError extends Error {
  readonly name: string = "UserValidationDomainError";
  constructor(
    readonly code: string,
    readonly message: string,
    readonly errors: { field: string; message: string }[]
  ) {
    super(message);
  }
}
