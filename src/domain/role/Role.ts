export default class Role {
  private constructor(
    public readonly id: number,
    public readonly name: string,
  ) {}

  static create(id: number, name: string): Role {
    return new Role(id, name);
  }
}

export enum Roles {
  Librarian = "LIBRARIAN",
  Admin = "ADMIN",
  User = "USER",
}
