export default class ValidationDomainError extends Error {
  constructor(
    message: string,
    public readonly _errors: string[],
  ) {
    super(message);
  }
}
