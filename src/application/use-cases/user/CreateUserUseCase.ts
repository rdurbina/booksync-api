import { inject, injectable } from "inversify";
import User from "../../../domain/user/User.js";
import IUserRepository from "../../repositories/IUserRepository.js";
import { DI_TYPES } from "../../../di/types.js";
import { failure, Result, success } from "../../../result/Result.js";
import { genSalt, hash } from "bcrypt";
import ApplicationError from "../../errors/ApplicationError.js";
import CreateUserRequest from "../../dtos/user/requests/CreateUserRequest.js";
import ApplicationErrorCodes from "../../errors/ApplicationErrorCodes.js";
import ConflictError from "../../errors/ConflictError.js";
import UserFields from "../../../domain/user/UserFields.js";
import UserResponse from "../../dtos/user/responses/UserResponse.js";
import NewUser from "../../../domain/user/NewUser.js";
import IRoleRepository from "../../repositories/IRoleRepository.js";
import Role from "../../../domain/role/Role.js";
import InternalDomainError from "../../../domain/errors/InternalDomainError.js";
import UserMapper from "../../mappers/UserMapper.js";
import { CreateUserProps } from "../../../domain/user/UserProps.js";

//Orchestrates user creation
@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject(DI_TYPES.UserRepository)
    private readonly _userRepository: IUserRepository,
    private readonly _roleRepository: IRoleRepository
  ) {}

  async execute(
    createUserRequest: CreateUserRequest,
  ): Promise<Result<UserResponse, ApplicationError>> {

    //Fetch default role
    const defaultRole: Role = await this._roleRepository.getDefaultRole();

    //Map into a prop object
    const createUserProps: CreateUserProps = UserMapper.toCreateUserProps(createUserRequest);

    //Call the method that contain validation for fields
    const result = NewUser.create(createUserProps, defaultRole);

    if (!result.isSuccess) {
      return failure(
        new ApplicationError(
          ApplicationErrorCodes.ValidationError,
          result.error,
        ),
      );
    }

    //Conflict validation
    const isEmailInUse: User | null = await this._userRepository.findByEmail(
      createUserRequest.email,
    );
    if (isEmailInUse) {
      const conflictError: ConflictError = new ConflictError(UserFields.Email);
      return failure(
        new ApplicationError(
          ApplicationErrorCodes.ConflictError,
          conflictError,
        ),
      );
    }

    const isUsernameInUse: User | null = await this._userRepository.findByUsername(
      createUserRequest.username,
    );
    if (isUsernameInUse) {
      const conflictError: ConflictError = new ConflictError(
        UserFields.Username,
      );
      return failure(
        new ApplicationError(
          ApplicationErrorCodes.ConflictError,
          conflictError,
        ),
      );
    }

    //Extract the value from the result
    const newUser: NewUser = result.value;

    //Encrypt the user's password
    const salt = await genSalt(10);
    const hashedPassword = await hash(newUser.password, salt);
    newUser.updatePasswordHash(hashedPassword);

    //Get the ID and generate borrow code to proceed with the 2nd step of the account creation
    const newUserId: number = await this._userRepository.add(newUser);
    const borrowCode: string = newUser.createBorrowCode(newUserId);
    const user: User | null = await this._userRepository.updateBorrowCode(newUserId, borrowCode);

    if (!user) {
      throw new InternalDomainError('Failed to update the borrowCode property, repository response is null')
    }
    
    return success(UserMapper.toResponse(user));
  }
}
