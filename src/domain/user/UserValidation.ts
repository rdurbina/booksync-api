import InvalidInputDomainError from "../errors/InvalidInputDomainError";

const userValidator = {
  emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  passwordRegex: /^(?=.*[!@#$%^&*])(?=.{8,})/,
  validateNonOptionalParams(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ): InvalidInputDomainError[] {
    const errors: InvalidInputDomainError[] = [];
    this.validateFirstName(firstName, errors);
    this.validateLastName(lastName, errors);
    this.validateUsername(username, errors);
    this.validateEmail(email, errors);
    this.validatePassword(password, errors);

    return errors;
  },
  validateId(id: string, errors: InvalidInputDomainError[]): void {
    if (id === null || id === "") {
      errors.push(
        new InvalidInputDomainError("Id.Empty", "The id can't be empty.")
      );
    }
  },
  validateEmail(email: string, errors: InvalidInputDomainError[]) {
    if (!this.emailRegex.test(email)) {
      errors.push(
        new InvalidInputDomainError(
          "Email.InvalidInput",
          "Invalid email address. Some valid examples: name@mymail.com | name@myinstitution.edu.us"
        )
      );
    }
  },
  validatePassword(password: string, errors: InvalidInputDomainError[]) {
    if (!this.passwordRegex.test(password)) {
      errors.push(
        new InvalidInputDomainError(
          "Password.InvalidInput",
          "The password should at least contain one special character" +
            "from: ! @ # $ % ^ & and be at least 8 characters long"
        )
      );
    }
  },
  validateUsername(username: string, errors: InvalidInputDomainError[]) {
    if (username.length < 2) {
      errors.push(
        new InvalidInputDomainError(
          "Username.InvalidInput",
          "The username should be at least characters long."
        )
      );
    }
  },
  validateFirstName(firstName: string, errors: InvalidInputDomainError[]) {
    if (firstName.length < 2) {
      errors.push(
        new InvalidInputDomainError(
          "firstName.InvalidInput",
          "The first name should be at least 2 characters long"
        )
      );
    }
  },
  validateLastName(lastName: string, errors: InvalidInputDomainError[]) {
    if (lastName.length < 2) {
      errors.push(
        new InvalidInputDomainError(
          "lastName.InvalidInput",
          "The last name should be at least 2 characters long"
        )
      );
    }
  },
};

export default userValidator;
