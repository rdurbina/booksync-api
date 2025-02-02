import { Router } from "express";
import UserController from "../controllers/UserController.js"

const userController: UserController = new UserController();

const userRouter: Router = Router();

userRouter.get("/create", userController.createUser);

export default userRouter;
