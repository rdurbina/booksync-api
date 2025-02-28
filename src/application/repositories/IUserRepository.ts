import User from "../../domain/user/User";
import { Result } from "../../shared/result/Result";
import NotFoundError from "../errors//base/NotFoundError";
import UnexpectedError from "../errors/base/UnexpectedError";

export default interface IUserRepository {
  add(user: User): Promise<Result<User, UnexpectedError>>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<Result<User, NotFoundError>>;
  findByUsername(username: string): Promise<User>;
  delete(id: string): Promise<User>;
}
