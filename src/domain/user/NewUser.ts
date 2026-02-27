import { Result, failure, success } from "../../result/Result";
import ValidationAggregateDomainError from "../errors/ValidationAggregateDomainError";
import ValidationDomainError from "../errors/ValidationDomainError";
import Role from "../role/Role";
import UserFields from "./UserFields";
import { CreateUserProps } from "./UserProps";

/*
  This class represents a user yet not persisted, it does not 
  have an id or borrowCode field as the regular User entity,
  usage should be limited to validating data for new users
  until assigned a proper ID and borrowCode.
*/

export default class NewUser {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly username: string,
    public readonly email: string,
    private _password: string,
    public readonly role: Role,
  ) {}

  static create(
    props: CreateUserProps,
    role: Role
  ): Result<NewUser, ValidationAggregateDomainError> {
    const errors: ValidationDomainError[] = [];
    const { firstName, lastName, username, email, password} = props;
    // Email must:
    // - Contain exactly one '@' symbol
    // - Have a local part (before '@') with letters, numbers, dots, underscores, percent signs, plus or minus
    // - Have a domain part with letters, numbers, dots, or hyphens
    // - End with a top-level domain of at least 2 letters (e.g. .com, .net, .org)
    const emailRegex: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Password must:
    // - Be at least 8 characters long
    // - Contain at least one special character from: ! @ # $ % ^ & *
    const passwordRegex: RegExp = /^(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!emailRegex.test(email))
      errors.push(new ValidationDomainError(UserFields.Email));
    if (!passwordRegex.test(password))
      errors.push(new ValidationDomainError(UserFields.Password));

    //Validate username
    if (username.length < 2 || username.length > 10)
      errors.push(new ValidationDomainError(UserFields.Username));

    if (firstName.length > 30)
      errors.push(new ValidationDomainError(UserFields.FirstName));
    if (lastName.length > 30)
      errors.push(new ValidationDomainError(UserFields.LastName));

    if (errors.length > 0)
      return failure(new ValidationAggregateDomainError(errors));

    return success(
      new NewUser(
        firstName,
        lastName,
        username.toLowerCase(),
        email,
        password,
        role,
      ),
    );
  }

  createBorrowCode(id: number): string {
    return `B-${this.firstName.slice(0, 2)}-${this.lastName.slice(0, 2)}-${id}`.toUpperCase();
  }

  updatePasswordHash(hash: string): void {
    this._password = hash;
  }

  get password() {
    return this._password;
  }
}
