import { Request, Response } from "express";
import IUserService from "../interfaces/services/IUserService";
import UserEntity from "../entities/UserEntity.js";
import { DEFAULT_ROLE } from "../utils/constants.js";

export default class UserController {
  // private userService: IUserService;

  // constructor(userService: IUserService) {
  //   this.userService = userService;
  // }

  async createUser(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const user: UserEntity = new UserEntity(
      username,
      email,
      password,
      DEFAULT_ROLE
    );
    try {
      res.send("Hello world");
    } catch (e) {}
  }
}
