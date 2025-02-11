import app from "./app.js";
import { mongooseConnection } from "./infrastructure/config/MongoDBConfig.js";

const PORT = process.env.PORT || 3000;

const startSever = async () => {
  try {
    await mongooseConnection();
    app.listen(PORT, () => {
      console.log("Server listening on port:", PORT);
    })
  } catch (error) {
    console.log("Database connection error", error);
    process.exit(1);
  }
}

startSever();