export default class UserDto {
  private constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly username: string,
    readonly email: string,
    readonly password?: string,
    readonly isAdmin?: boolean,
    readonly id?: string
  ) {}

  static create(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ): UserDto {
    return new UserDto(firstName, lastName, username, email, password);
  }
}
