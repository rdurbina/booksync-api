import { injectable } from "inversify";
import User from "../../domain/user/User.js";
import IUserRepository from "../../application/repositories/IUserRepository.js";
import UserMapper from "../mappers/UserMapper.js";
import { failure, Result, success } from "../../shared/result/Result.js";
import UnexpectedError from "../../application/errors/UnexpectedError.js";

@injectable()
export default class MongoUserRepositoryImpl implements IUserRepository {
  async add(user: User): Promise<Result<User, UnexpectedError>> {
    const userModel = UserMapper.toMongooseModel(user);
    const savedUser = await userModel.save();
    if (Object.keys(savedUser).length === 0) {
      return failure(
        new UnexpectedError(
          "Couldn't save user.",
          "Something went wrong while trying to save the user."
        )
      );
    }
    const result = UserMapper.fromMongooseModelToEntity(userModel);
    //Exceptional case
    if (result === null) {
      throw new UnexpectedError(
        "Something went wrong.",
        "User data is probably corrupted, immediate verification required."
      );
    }
    return success(result);
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
