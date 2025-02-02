import mongoose from "mongoose";

export const mongooseConnection = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("Invalid connection string");
    }
    await mongoose.connect(uri);
    console.log("Database is ready!");
  } catch (e) {
    console.log("Error while trying to connect to MongoDB, exiting...");
    process.exit(1);
  };
};
