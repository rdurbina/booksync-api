import mongoose from "mongoose";

export const mongooseConnection = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Empty connection string.");
  }
  await mongoose.connect(uri);
  console.log("MongoDB database ready!");
};
