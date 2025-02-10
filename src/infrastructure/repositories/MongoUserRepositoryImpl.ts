import { injectable } from "inversify";
import User from "../../domain/entities/User.js";
import IUserRepository from "../../domain/repositories/IUserRepository.js";
import UserMapper from "../mappers/UserMapper.js";

@injectable()
export default class MongoUserRepositoryImpl implements IUserRepository {
  async create(user: User): Promise<User> {
    const userModel = UserMapper.toModel(user);
    const savedUser = await userModel.save();
    return UserMapper.fromModel(savedUser);
  }
  findById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  findByUsername(username: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
