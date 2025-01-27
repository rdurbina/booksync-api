import express from "express";
import "dotenv/config";
import { mongooseConnection } from "./config/dbConfig.js";
import { USER_API } from "./utils/constants.js";
import userRouter from "./routes/userRouter.js";

const PORT = process.env.PORT || 3000;

mongooseConnection();

const server = express();

server.use(USER_API.BASE, userRouter);

server.listen(PORT, () => {
  console.log("Server started on port: ", PORT);
});
