import mongoose, { InferSchemaType, model, Types } from "mongoose";

//User schema
const userSchema = new mongoose.Schema({
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
  role: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const UserModel = model("User", userSchema);

export type UserModelType = InferSchemaType<typeof userSchema> & {
  _id: Types.ObjectId;
};

export default UserModel;
