import { inject, injectable } from "inversify";
import { DI_TYPES } from "../../../di/types";
import IUserRepository from "../../repositories/IUserRepository";
import { completed, failure, Result } from "../../../result/Result";
import ApplicationError from "../../errors/ApplicationError";
import ApplicationErrorCodes from "../../errors/ApplicationErrorCodes";

@injectable()
export default class DeleteUserUseCase {
  constructor(
    @inject(DI_TYPES.UserRepository)
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(id: number): Promise<Result<void, ApplicationError>> {
    const usersExists = await this._userRepository.findById(id);
    if (usersExists)
      return failure(
        new ApplicationError(ApplicationErrorCodes.NotFoundError, null),
      );
    await this._userRepository.delete(id);
    return completed();
  }
}
