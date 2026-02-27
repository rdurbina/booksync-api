import Role from "../role/Role.js";
import { fromPersistenceProps } from "./UserProps.js";

export default class User {
  private constructor(
    private _firstName: string,
    private _lastName: string,
    private _username: string,
    private _email: string,
    private _password: string,
    private _role: Role,
    private _borrowCode: string,
    public readonly _id: number,
  ) {}

  static fromPersistence(props: fromPersistenceProps): User {
    return new User(
      props.firstName,
      props.lastName,
      props.username,
      props.email,
      props.password,
      props.role,
      props.borrowCode,
      props.id
    );
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

  get role(): Role {
    return this._role;
  }

  get borrowCode(): string {
    return this._borrowCode;
  }

  get id(): number {
    return this._id;
  }
}
