export default class UserDto {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly email: string,
    readonly role: string,
    private _password?: string
  ) {}

  get password(): string {
    return this._password ?? "";
  }
  set password(value: string) {
    this._password = value;
  }
}
