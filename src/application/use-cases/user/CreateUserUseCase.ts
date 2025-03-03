import { inject, injectable } from "inversify";
import User from "../../../domain/user/User.js";
import IUserRepository from "../../repositories/IUserRepository.js";
import UserDto from "../../dtos/UserDto.js";
import { DI_TYPES } from "../../../di/types.js";
import { failure, Result, success } from "../../../shared/result/Result.js";
import AppError from "../../errors/base/AppError.js";
import UnexpectedError from "../../errors/base/UnexpectedError.js";
import ValidationError from "../../errors/base/ValidationError.js";
import EmailAlreadyInUseError from "../../errors/EmailAlreadyInUseError.js";
import UsernameAlreadyInUseError from "../../errors/UsernameAlreadyInUseError.js";
import { hash } from "bcrypt";

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject(DI_TYPES.UserRepository)
    private readonly _userRepository: IUserRepository
  ) {}

  async execute(data: UserDto): Promise<Result<UserDto, AppError>> {
    const userResult = User.create(
      data.firstName,
      data.lastName,
      data.username,
      data.email,
      data.password ?? ""
    );
    if (!userResult.isSuccess) {
      return failure(
        new ValidationError(
          "Couldn't create user",
          "Issues were encountered when trying to create a new user",
          userResult.error.errors
        )
      );
    }

    const user = userResult.value;

    const isEmailAlreadyInUse = await this._userRepository.findByEmail(
      user.email
    );

    if (isEmailAlreadyInUse) {
      return failure(
        new EmailAlreadyInUseError(
          "The email provided is already in use",
          "Cannot create a user with an email already in use, please provide a valid email address."
        )
      );
    }

    const isUsernameAlreadyInUse = await this._userRepository.findByUsername(
      user.username
    );

    if (isUsernameAlreadyInUse) {
      return failure(
        new UsernameAlreadyInUseError(
          "The username provided is already in use",
          "Cannot create a user with a username already in use, please provide a valid username."
        )
      );
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10");
    const hashedPassword = await hash(user.password, saltRounds);
    const isPasswordSet = user.setHashedPassword(hashedPassword);

    if (!isPasswordSet) {
      return failure(
        new UnexpectedError(
          "Unexpected error",
          "Something went wrong... Please try again later."
        )
      );
    }

    const savedUserResult = await this._userRepository.add(userResult.value);

    if (!savedUserResult.isSuccess) {
      throw new UnexpectedError("Something went wrong...", "");
    }

    return success(
      UserDto.create(
        savedUserResult.value.firstName,
        savedUserResult.value.lastName,
        savedUserResult.value.username,
        savedUserResult.value.email,
        savedUserResult.value.password
      )
    );
  }
}
