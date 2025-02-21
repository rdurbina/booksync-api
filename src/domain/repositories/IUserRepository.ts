import User from "../user/User.js";

export default interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User>;
  findByUsername(username: string): Promise<User>;
  delete(id: string): Promise<User>;
}
