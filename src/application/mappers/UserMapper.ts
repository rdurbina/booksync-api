import UserResponse from "../dtos/user/responses/UserResponse";
import User from "../../domain/user/User";
import RoleMapper from "./RoleMapper";
import CreateUserRequest from "../dtos/user/requests/CreateUserRequest";
import { CreateUserProps } from "../../domain/user/UserProps";

const UserMapper = {
  toResponse(user: User) {
    return new UserResponse(
      user.id,
      user.firstName,
      user.lastName,
      user.username,
      user.email,
      user.password,
      user.borrowCode,
      RoleMapper.toResponse(user.role),
    );
  },
  toCreateUserProps(createUserRequest: CreateUserRequest): CreateUserProps {
    return {
      firstName: createUserRequest.firstName,
      lastName: createUserRequest.lastName,
      username: createUserRequest.username,
      email: createUserRequest.email,
      password: createUserRequest.password,
    };
  },
};

export default UserMapper;
