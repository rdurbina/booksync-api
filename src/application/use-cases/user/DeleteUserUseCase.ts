import { inject, injectable } from "inversify";
import { DI_TYPES } from "../../../di/types";
import IUserRepository from "../../repositories/IUserRepository";
import { failure, Result, success } from "../../../shared/result/Result";
import UserNotFoundError from "../../errors/UserNotFoundError";
import AppError from "../../errors/base/AppError";

@injectable()
export default class DeleteUserUseCase {
  constructor(
    @inject(DI_TYPES.UserRepository)
    private readonly _userRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<Result<void, AppError>> {
    const result = await this._userRepository.delete(id);
    if (!result.isSuccess) {
      return failure(
        new UserNotFoundError(
          "User not found",
          "The user you are trying to delete does not exist."
        )
      );
    } else return success(undefined);
  }
}
