class InvalidFieldAssignmentDomainError extends Error {
  public readonly name: string = "InvalidFieldAssignmentDomainError";
  constructor(readonly code: string, readonly message: string) {
    super(message);
  }
}
