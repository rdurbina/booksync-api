import { inject, injectable } from "inversify";
import { DI_TYPES } from "../../../di/types";
import IUserRepository from "../../repositories/IUserRepository";
import UserDto from "../../dtos/UserDto";
import MissingIdError from "../../errors/MissingIdError";
import { failure, Result, success } from "../../../result/Result";
import NotFoundError from "../../errors/base/NotFoundError";
import ValidationError from "../../errors/base/ValidationError";
import AppError from "../../errors/base/AppError";
import UnexpectedError from "../../errors/base/UnexpectedError";

@injectable()
export default class UpdatePersonalInformationUseCase {
  constructor(
    @inject(DI_TYPES.UserRepository)
    private readonly _userRepository: IUserRepository
  ) {}

  async execute(data: UserDto): Promise<Result<UserDto, AppError>> {
    const userId = data.id;
    if (!userId) {
      return failure(
        new MissingIdError(
          "The id of the user was not provided",
          "Cannot fetch a user without an id."
        )
      );
    }

    const user = await this._userRepository.findById(userId);

    if (!user) {
      return failure(
        new NotFoundError(
          "User not found",
          "The user with the provided id does not exist."
        )
      );
    }

    const updatedUserEntityResult = user.updatePersonalInformation(
      data.firstName,
      data.lastName
    );

    if (!updatedUserEntityResult.isSuccess) {
      return failure(
        new ValidationError(
          "Cannot update personal information",
          updatedUserEntityResult.error.message,
          updatedUserEntityResult.error.errors
        )
      );
    }

    const updatedUserEntity = updatedUserEntityResult.value;

    const repositoryResult = await this._userRepository.update(
      userId,
      updatedUserEntity
    );

    if (!repositoryResult.isSuccess)
      throw new UnexpectedError(
        "Something went wrong...",
        "An unexpected error has occurred."
      );

    const updatedUser = repositoryResult.value;
    return success(
      UserDto.fromDatabase(
        updatedUser.firstName,
        updatedUser.lastName,
        updatedUser.username,
        updatedUser.email
      )
    );
  }
}
