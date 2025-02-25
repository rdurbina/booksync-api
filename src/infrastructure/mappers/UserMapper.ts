import User from "../../domain/user/User";
import UserModel from "../databases/mongodb/models/UserModel";
import { UserModelType } from "../databases/mongodb/models/UserModel";

const UserMapper = {
  toMongooseModel(user: User): UserModelType {
    return new UserModel({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
    });
  },

  fromMongooseModelToEntity(userModel: UserModelType): User | null {
    const result = User.createWithAllProperties(
      userModel.firstName,
      userModel.lastName,
      userModel.username,
      userModel.email,
      userModel.password,
      userModel.isAdmin,
      userModel._id.toString()
    );
    if (!result.isSuccess) {
      return null;
    }
    return result.value;
  },
};

export default UserMapper;
