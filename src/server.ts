import express from "express";
import "dotenv/config";
import userRouter from "./presentation/routes/userRouter.js";
import { mongooseConnection } from "./infrastructure/config/MongoDBConfig.js";

mongooseConnection();

const PORT = process.env.PORT || 3000;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use("/user", userRouter);

server.listen(PORT, () => {
console.log("Server started on port: ", PORT);
});
