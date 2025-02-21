import User from "../../domain/user/User";
import UserModel from "../databases/mongodb/models/UserModel";
import { UserModelType } from "../databases/mongodb/models/UserModel";

export default class UserMapper {
  static fromModel(userModel: UserModelType): User {
    return new User(
      userModel.username,
      userModel.email,
      userModel.password,
      userModel.role,
      userModel._id.toString()
    );
  }

  static toModel(user: User) {
    return new UserModel({
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  }
}
