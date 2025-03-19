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
  validateFirstName(firstName, errors);
  validateLastName(lastName, errors);
  validateUsername(username, errors);
  validateEmail(email, errors);
  validatePassword(password, errors);

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

export function validateEmail(
  email: string,
  errors: InvalidInputDomainError[]
) {
  if (!emailRegex.test(email)) {
    errors.push(
      new InvalidInputDomainError(
        "Email.InvalidInput",
        "Invalid email address. Some valid examples: name@mymail.com | name@myinstitution.edu.us"
      )
    );
  }
}

export function validatePassword(
  password: string,
  errors: InvalidInputDomainError[]
) {
  if (!passwordRegex.test(password)) {
    errors.push(
      new InvalidInputDomainError(
        "Password.InvalidInput",
        "The password should at least contain one special character" +
          "from: ! @ # $ % ^ & and be at least 8 characters long"
      )
    );
  }
}

export function validateUsername(
  username: string,
  errors: InvalidInputDomainError[]
) {
  if (username.length < 2) {
    errors.push(
      new InvalidInputDomainError(
        "Username.InvalidInput",
        "The username should be at least characters long."
      )
    );
  }
}

export function validateFirstName(
  firstName: string,
  errors: InvalidInputDomainError[]
) {
  if (firstName.length < 2) {
    errors.push(
      new InvalidInputDomainError(
        "firstName.InvalidInput",
        "The first name should be at least 2 characters long"
      )
    );
  }
}

export function validateLastName(
  lastName: string,
  errors: InvalidInputDomainError[]
) {
  if (lastName.length < 2) {
    errors.push(
      new InvalidInputDomainError(
        "lastName.InvalidInput",
        "The last name should be at least 2 characters long"
      )
    );
  }
}
