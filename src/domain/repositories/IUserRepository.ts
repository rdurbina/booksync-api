import User from "../entities/User.js";

export interface IUserRepository {
  create(user: User): boolean;
  findById(id: string): User;
  findByUsername(username: string): User;
  delete(id: string): boolean;
}
