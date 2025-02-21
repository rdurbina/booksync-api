import { inject, injectable } from "inversify";
import User from "../../../domain/user/User.js";
import IUserRepository from "../../../domain/repositories/IUserRepository";
import UserDto from "../../dtos/UserDto.js";
import { DI_TYPES } from "../../../di/types.js";

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject(DI_TYPES.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(data: UserDto) {
    const user = new User(data.username, data.email, data.password, data.role);
    const savedUser = await this.userRepository.create(user);
    return new UserDto(savedUser.id ?? "", savedUser.username, savedUser.email, savedUser.role);
  }
}
