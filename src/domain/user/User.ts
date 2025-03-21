import { failure, Result, success } from "../../shared/result/Result.js";
import InvalidInputDomainError from "../errors/InvalidInputDomainError.js";
import UserValidationDomainError from "../errors/UserValidationDomainError.js";
import userValidator from "../validations/UserValidations.js";

export default class User {
  private constructor(
    private _firstName: string,
    private _lastName: string,
    private _username: string,
    private _email: string,
    private _password: string,
    private _isAdmin: boolean,
    private readonly _id?: string
  ) {}

  static create(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    isAdmin: boolean = false
  ): Result<User, UserValidationDomainError> {
    const errors: InvalidInputDomainError[] =
      userValidator.validateNonOptionalParams(
        firstName,
        lastName,
        username,
        email,
        password
      );

    if (errors.length > 0) {
      return failure(
        new UserValidationDomainError("User.InvalidInput", errors)
      );
    }
    return success(
      new User(firstName, lastName, username, email, password, isAdmin)
    );
  }

  static createWithAllProperties(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    isAdmin: boolean = false,
    id: string
  ): Result<User, UserValidationDomainError> {
    const errors: InvalidInputDomainError[] =
      userValidator.validateNonOptionalParams(
        firstName,
        lastName,
        username,
        email,
        password
      );

    userValidator.validateId(id, errors);

    if (errors.length > 0) {
      return failure(
        new UserValidationDomainError("User.InvalidInput", errors)
      );
    }
    return success(
      new User(firstName, lastName, username, email, password, isAdmin)
    );
  }

  setHashedPassword(hashedPassword: string): boolean {
    if (hashedPassword === null) {
      return false;
    }
    this._password = hashedPassword;
    return true;
  }

  updatePersonalInformation(
    firstName: string,
    lastName: string
  ): Result<User, UserValidationDomainError> {
    const errors: InvalidInputDomainError[] = [];
    userValidator.validateFirstName(firstName, errors);
    userValidator.validateLastName(lastName, errors);
    if (errors.length > 0) {
      return failure(
        new UserValidationDomainError(
          "The provided information is invalid, please try again",
          errors
        )
      );
    }

    this._firstName = firstName;
    this._lastName = lastName;

    return success(this);
  }

  updateAccountInformation(
    email: string,
    password: string
  ): Result<User, UserValidationDomainError> {
    const errors: InvalidInputDomainError[] = [];
    userValidator.validateEmail(email, errors);
    userValidator.validatePassword(password, errors);

    if (errors.length > 0) {
      return failure(
        new UserValidationDomainError(
          "The provided information is invalid, please try again",
          errors
        )
      );
    }

    return success(this);
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get username(): string {
    return this._username;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }

  get id(): string | undefined {
    return this._id;
  }
}
