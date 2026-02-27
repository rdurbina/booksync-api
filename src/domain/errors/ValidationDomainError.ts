export default class ValidationDomainError extends Error {
  constructor(public readonly field: string) {
    super();
  }
}
