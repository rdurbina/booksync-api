import mongoose from "mongoose";

export const mongooseConnection = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("Empty connection string.");
    }
    await mongoose.connect(uri);
    console.log("Database is ready!");
  } catch (error) {
    console.log("Error while trying to connect to MongoDB, exiting...");
    console.log(error);
    process.exit(1);
  };
};
