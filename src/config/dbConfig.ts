import mongoose from "mongoose";

export const mongooseConnection = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("Invalid connection string");
    }
    await mongoose.connect(uri);
    console.log("Database ready!");
  } catch (e) {
    console.log("Error connecting to MongoDB, exiting...");
    process.exit(1);
  };
};
