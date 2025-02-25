export default abstract class SpecificDomainError extends Error {
  constructor(readonly code: string, readonly message: string) {
    super(message);
  }
}
