export default class UserDto {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public role: string,
    private _password?: string
  ) {}

  get password(): string {
    return this._password ?? "";
  }
  set password(value: string) {
    this._password = value;
  }
}
