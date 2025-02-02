import User from "../../domain/entities/User.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import UserModel from "../databases/mongodb/models/UserModel.js";

export default class MongoUserRepositoryImpl implements IUserRepository {
    create(user: User): boolean {
        throw new Error("Method not implemented.");
    }
    findById(id: string): User {
        throw new Error("Method not implemented.");
    }
    findByUsername(username: string): User {
        throw new Error("Method not implemented.");
    }
    delete(id: string): boolean {
        throw new Error("Method not implemented.");
    }

}
