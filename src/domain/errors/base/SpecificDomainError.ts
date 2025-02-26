export default abstract class SpecificDomainError extends Error {
  constructor(readonly code: string, readonly message: string) {
    super(message);
  }
  toJSON() {
    return {
      code: this.code,
      message: this.message,
      name: this.name,
    };
  }
}
