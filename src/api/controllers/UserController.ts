import { Request, Response } from "express";
import CreateUserUseCase from "../../application/use-cases/user/CreateUserUseCase.js";
import UserDto from "../../application/dtos/UserDto.js";
import { inject, injectable } from "inversify";

@injectable()
export default class UserController {
  constructor(
    @inject(CreateUserUseCase)
    private readonly _createUserUseCase: CreateUserUseCase
  ) {}
  async createUser(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, username, password, email } = req.body;
    try {
      const data = UserDto.create(
        firstName,
        lastName,
        username,
        email,
        password
      );
      const savedUser = await this._createUserUseCase.execute(data);
      res.status(200).json({ savedUser: savedUser });
    } catch (error) {
      //Error behavior yet not specified
      console.log(error);
      res.status(400).json({ message: "An error has occurred..." });
    }
  }
}
