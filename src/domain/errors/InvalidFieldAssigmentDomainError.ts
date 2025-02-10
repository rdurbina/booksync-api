class InvalidFieldAssignmentDomainError extends Error {
  readonly name: string = "InvalidFieldAssignmentDomainError"
  constructor(
    readonly message: string,
  ) {
    super(message);
  }
}
