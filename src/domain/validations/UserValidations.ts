import SpecificDomainError from "../errors/base/SpecificDomainError";
import InvalidInputDomainError from "../errors/InvalidInputDomainError";

const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{8,})/;

export function validateNonOptionalParams(
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
): SpecificDomainError[] {
  const errors: InvalidInputDomainError[] = [];
  if (firstName.length < 2) {
    errors.push(
      new InvalidInputDomainError(
        "firstName.InvalidInput",
        "The first name should be at least 2 characters long"
      )
    );
  }
  if (lastName.length < 2) {
    errors.push(
      new InvalidInputDomainError(
        "lastName.InvalidInput",
        "The last name should be at least 2 characters long"
      )
    );
  }
  if (username.length < 2) {
    errors.push(
      new InvalidInputDomainError(
        "Username.InvalidInput",
        "The username should be at least characters long."
      )
    );
  }
  if (emailRegex.test(email)) {
    errors.push(
      new InvalidInputDomainError(
        "Email.InvalidInput",
        "Invalid email address."
      )
    );
  }
  if (passwordRegex.test(password)) {
    errors.push(
      new InvalidInputDomainError(
        "Password.InvalidInput",
        "The password must be at least 8 characters long."
      )
    );
  }
  return errors;
}

export function validateId(
  id: string,
  errors: InvalidInputDomainError[]
): void {
  if (id === null || id === "") {
    errors.push(
      new InvalidInputDomainError("Id.Empty", "The id can't be empty.")
    );
  }
}
