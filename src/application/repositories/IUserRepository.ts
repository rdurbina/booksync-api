import User from "../../domain/user/User";
import { Result } from "../../shared/result/Result";
import RepositoryError from "../errors/RepositoryError";

export default interface IUserRepository {
  add(user: User): Promise<Result<User, RepositoryError>>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  delete(id: string): Promise<Result<boolean, RepositoryError>>;
}
