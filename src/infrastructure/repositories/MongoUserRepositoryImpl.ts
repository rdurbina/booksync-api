import { injectable } from "inversify";
import User from "../../domain/user/User.js";
import IUserRepository from "../../domain/repositories/IUserRepository.js";
import UserMapper from "../mappers/UserMapper.js";

@injectable()
export default class MongoUserRepositoryImpl implements IUserRepository {
  async create(user: User): Promise<User> {
    const userModel = UserMapper.toModel(user);
    const savedUser = await userModel.save();
    return UserMapper.fromModel(savedUser);
  }
  async findById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async findByUsername(username: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
