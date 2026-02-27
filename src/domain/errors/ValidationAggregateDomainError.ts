import ValidationDomainError from "./ValidationDomainError";

export default class ValidationAggregateDomainError extends Error {
  constructor(public readonly errors: ValidationDomainError[]) {
    super();
  }
}
