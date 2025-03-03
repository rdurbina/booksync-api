import { injectable } from "inversify";
import User from "../../domain/user/User.js";
import IUserRepository from "../../application/repositories/IUserRepository.js";
import UserMapper from "../mappers/UserMapper.js";
import { failure, Result, success } from "../../shared/result/Result.js";
import RepositoryError from "../../application/errors/RepositoryError.js";
import ErrorCodes from "../../application/errors/enums/ErrorCodes.js";
import UserModel from "../databases/mongodb/models/UserModel.js";
import DataIntegrityError from "../errors/DataIntegrityError.js";

@injectable()
export default class MongoUserRepositoryImpl implements IUserRepository {
  async add(user: User): Promise<Result<User, RepositoryError>> {
    const userModel = UserMapper.toMongooseModel(user);
    const savedUser = await userModel.save();
    const result = UserMapper.fromMongooseModelToEntity(savedUser);
    //Exceptional case: conversion to user entity fails -> bad data integrity
    if (result === null) throw new DataIntegrityError();
    return success(result);
  }

  async delete(id: string): Promise<Result<void, RepositoryError>> {
    const deletedUser = await UserModel.findOneAndDelete({ _id: id });
    if (deletedUser === null)
      return failure(new RepositoryError(ErrorCodes.NotFoundError));
    return success(undefined);
  }

  async findById(id: string): Promise<User | null> {
    const userDocument = await UserModel.findById(id);
    if (userDocument === null) return null;
    const user = UserMapper.fromMongooseModelToEntity(userDocument);
    //Exceptional case: conversion to user entity fails -> bad data integrity
    if (user === null) throw new DataIntegrityError();
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const userDocument = await UserModel.findOne({ username: username });
    if (userDocument === null) return null;
    const user = UserMapper.fromMongooseModelToEntity(userDocument);
    //Exceptional case: conversion to user entity fails -> bad data integrity
    if (user === null) throw new DataIntegrityError();
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDocument = await UserModel.findOne({ email: email });
    if (userDocument === null) return null;
    const user = UserMapper.fromMongooseModelToEntity(userDocument);
    //Exceptional case: conversion to user entity fails -> bad data integrity
    if (user === null) throw new DataIntegrityError();
    return user;
  }
}
