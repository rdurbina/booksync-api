import SpecificDomainError from "./base/SpecificDomainError.js";

export default class InvalidInputDomainError extends SpecificDomainError {
  readonly name: string = "InvalidFieldAssignmentDomainError";
}
