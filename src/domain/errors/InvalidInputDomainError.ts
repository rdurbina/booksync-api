import SpecificDomainError from "./base/SpecificDomainError.js";

export default class InvalidInputDomainError extends SpecificDomainError {
  public readonly name: string = "InvalidFieldAssignmentDomainError";
}
