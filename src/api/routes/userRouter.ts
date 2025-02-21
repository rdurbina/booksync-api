import { Router } from "express";
import UserController from "../controllers/UserController.js"
import MongoUserRepositoryImpl from "../../infrastructure/repositories/MongoUserRepositoryImpl.js";
import CreateUserUseCase from "../../application/use-cases/user/CreateUserUseCase.js";
import { container } from "../../di/container.js";

const userController = container.get(UserController);

const userRouter: Router = Router();

userRouter.post("/create", userController.createUser.bind(userController));

export default userRouter;
