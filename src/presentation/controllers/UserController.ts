import { Request, Response } from "express";

export default class UserController {
  constructor() {}
  createUser(req: Request, res: Response) {
    res.send("Hello world");
  }

}
