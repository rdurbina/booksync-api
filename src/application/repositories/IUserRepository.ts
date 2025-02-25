import User from "../../domain/user/User";
import { Result } from "../../shared/result/Result";
import UnexpectedError from "../errors/UnexpectedError";

export default interface IUserRepository {
  add(user: User): Promise<Result<User, UnexpectedError>>;
  findById(id: string): Promise<User>;
  findByUsername(username: string): Promise<User>;
  delete(id: string): Promise<User>;
}
