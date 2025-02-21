export default class InvalidInputDomainError extends Error {
  public readonly name: string = "InvalidFieldAssignmentDomainError";
  constructor(readonly field: string, readonly message: string) {
    super(message);
  }
}
