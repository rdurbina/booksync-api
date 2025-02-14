export default class User {
  private readonly emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  private readonly passwordRegex = /^(?=.*[!@#$%^&*])(?=.{8,})/;
  private readonly allowedRoles = ["contributor", "admin"];

  constructor(
    private _username: string,
    private _email: string,
    private _password: string,
    private _role: string,
    private readonly _id: string | null = null
  ) {
    const errors: { field: string; message: string }[] = [];
    if (this.username.length < 2) {
      errors.push({
        field: "username",
        message: "The username should be at least characters long.",
      });
    }
    if (!this.emailRegex.test(this._email)) {
      errors.push({
        field: "email",
        message: "Invalid email address.",
      });
    }
    if (!this.passwordRegex.test(this._password)) {
      errors.push({
        field: "password",
        message: "The password must be at least 8 characters long.",
      });
    }
    if (this.role == "" || this.role == null) {
      errors.push({
        field: "role",
        message: "The role can't be empty.",
      });
    }
    if (!this.allowedRoles.includes(this.role)) {
      errors.push({
        field: "role",
        message: "Invalid role.",
      });
    }
    if (errors.length > 0) {
      throw new UserValidationDomainError(
        "The following errors where encountered when trying to create a user",
        errors
      );
    }
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    if (value.length < 2) {
      throw new InvalidFieldAssignmentDomainError(
        "The username should be at least characters long."
      );
    }
    this._username = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    if (!this.emailRegex.test(value)) {
      throw new InvalidFieldAssignmentDomainError("Invalid email address");
    }
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    if (!this.passwordRegex.test(value)) {
      throw new InvalidFieldAssignmentDomainError("The password must be at least 8 characters long.");
    }
    this._password = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    if (this.role == "" || this.role == null) {
      throw new InvalidFieldAssignmentDomainError("The role can't be empty.");
    }
    if (!this.allowedRoles.includes(this.role)) {
      throw new InvalidFieldAssignmentDomainError("Invalid role.");
    }
    this._role = value;
  }

  get id(): string | null {
    return this._id ?? null;
  }
}
