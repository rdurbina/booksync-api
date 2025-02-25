import GeneralDomainError from "./base/GeneralDomainError.js";

export default class UserValidationDomainError extends GeneralDomainError {
  readonly name: string = "UserValidationDomainError";
}
