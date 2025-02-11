import express from "express";
import "dotenv/config";
import userRouter from "./presentation/routes/userRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);

export default app;
