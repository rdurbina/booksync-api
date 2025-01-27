import User from "../entities/UserEntity";
import IUserService from "../interfaces/services/IUserService";

export default class UserService implements IUserService {
  createUser(user: User): boolean {
    throw new Error("Method not implemented.");
  }
  deleteUser(userId: number): boolean {
    throw new Error("Method not implemented.");
  }
}
