import { inject, injectable } from "inversify";
import User from "../../../domain/user/User.js";
import IUserRepository from "../../repositories/IUserRepository.js";
import UserDto from "../../dtos/UserDto.js";
import { DI_TYPES } from "../../../di/types.js";
import { failure, Result, success } from "../../../shared/result/Result.js";
import ValidationError from "../../errors/ValidationError.js";
import UnexpectedError from "../../errors/UnexpectedError.js";

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject(DI_TYPES.UserRepository)
    private readonly _userRepository: IUserRepository
  ) {}

  async execute(data: UserDto): Promise<Result<UserDto, ValidationError>> {
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
          userResult.error?.errors ?? []
        )
      );
    }

    const savedUserResult = await this._userRepository.add(userResult.value);

    if (!savedUserResult.isSuccess) {
      throw new UnexpectedError("Something went wrong", "");
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
