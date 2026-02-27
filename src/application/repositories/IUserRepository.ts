import NewUser from "../../domain/user/NewUser";
import User from "../../domain/user/User";

export default interface IUserRepository {
  add(user: NewUser): Promise<number>; //Returns the ID of the newly created user
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  delete(id: number): Promise<void>;
  update(userId: string, user: User): Promise<User | null>;
  updateBorrowCode(id: number, borrowCode: string): Promise<User | null>;
}
