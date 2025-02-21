import Result from "../../shared/result/Result.js";
import InvalidInputDomainError from "../errors/InvalidInputDomainError.js";

export default class User {
  private static readonly emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  private static readonly passwordRegex = /^(?=.*[!@#$%^&*])(?=.{8,})/;

  private constructor(
    private _username: string,
    private _email: string,
    private _password: string,
    private _role: string,
    private readonly _id?: string
  ) {}

  static create(
    username: string,
    email: string,
    password: string,
    role: string
  ): Result<User> {
    const errors: InvalidInputDomainError[] = [];
    if (username.length < 2) {
      errors.push(
        new InvalidInputDomainError(
          "username",
          "The username should be at least characters long."
        )
      );
    }
    if (!this.emailRegex.test(email)) {
      errors.push(
        new InvalidInputDomainError("email", "Invalid email address.")
      );
    }
    if (!this.passwordRegex.test(password)) {
      errors.push(
        new InvalidInputDomainError(
          "password",
          "The password must be at least 8 characters long."
        )
      );
    }
    if (role == "" || role == null) {
      errors.push(
        new InvalidInputDomainError("role", "The role can't be empty.")
      );
    }
    if (!Object.values(Roles).includes(role)) {
      errors.push(new InvalidInputDomainError("role", "Invalid role."));
    }

    if (errors.length > 0) {
      return Result.failure(
        new UserValidationDomainError(
          "There were errors when trying to initialize the user",
          errors
        )
      );
    }

    return Result.success(new User(username, email, password, role));
  }
}
