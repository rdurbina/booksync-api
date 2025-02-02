export default class User {
  constructor(
    private _username: string,
    private _email: string,
    private _password: string,
    private _role: string = "contributor"
  ) {}

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    if (value.length < 2) {
      throw new Error("The username should be at least characters long.");
    }
    this._username = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;    
    if (!emailRegex.test(value)) {
      throw new Error("Invalid email address");
    }
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(value)) {
      throw new Error("The password must be at least 8 characters long.");
    }
    this._password = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    const allowedRoles = ["contributor", "admin"];
    if(!allowedRoles.includes(value)) {
      throw new Error(`Invalid role. Allowed roles are ${allowedRoles.join(", ")}`);
    }
    this._role = value;
  }
}
