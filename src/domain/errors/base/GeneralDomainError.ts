export default abstract class GeneralDomainError extends Error {
  constructor(readonly message: string, readonly errors: Error[]) {
    super(message);
  }
}
