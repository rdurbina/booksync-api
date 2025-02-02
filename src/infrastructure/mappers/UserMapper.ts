import User from "../../domain/entities/User.js";
import UserModel from "../databases/mongodb/models/UserModel.js";

export default class UserMapper {
  static toModel(user: User) {
    return new UserModel({
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role
    })
  }
}
