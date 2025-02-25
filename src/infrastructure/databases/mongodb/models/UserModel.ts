import mongoose, { HydratedDocument, model } from "mongoose";

interface IUserModel {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

//User schema
const userSchema = new mongoose.Schema<IUserModel>(
  {
    firstName: {
      type: String,
      required: [true, "The firstName field is mandatory"],
    },
    lastName: {
      type: String,
      required: [true, "The lastName field is mandatory"],
    },
    username: {
      type: String,
      required: [true, "The username field is mandatory"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "The email field is mandatory"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "The password field is mandatory"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = model<IUserModel>("User", userSchema);

export type UserModelType = HydratedDocument<IUserModel>;

export default UserModel;
