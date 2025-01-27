export default class UserEntity {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public role: string
  ) {}
}
