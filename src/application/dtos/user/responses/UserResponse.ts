import RoleResponse from "../../role/responses/RoleResponse";

export default class UserResponse {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly borrowCode: string,
    public readonly role: RoleResponse,
  ) {}
}
