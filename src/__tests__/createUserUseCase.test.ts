import { describe, expect, test, vi, beforeEach } from "vitest";
import UserDto from "../application/dtos/UserDto";
import IUserRepository from "../application/repositories/IUserRepository";
import User from "../domain/user/User";
import { Failure, success } from "../shared/result/Result";
import CreateUserUseCase from "../application/use-cases/user/CreateUserUseCase";
import EmailAlreadyInUseError from "../application/errors/EmailAlreadyInUseError";
import UsernameAlreadyInUseError from "../application/errors/UsernameAlreadyInUseError";

describe("CreateUserUseCase", () => {
  let mockUserRepository: IUserRepository;
  let createUserUseCase: CreateUserUseCase;
  beforeEach(() => {
    mockUserRepository = {
      add: vi.fn(),
      findById: vi.fn(),
      findByEmail: vi.fn(),
      findByUsername: vi.fn(),
      delete: vi.fn(),
    };
    createUserUseCase = new CreateUserUseCase(
      mockUserRepository as IUserRepository
    );
  });

  test("should return a successful response", async () => {
    const mockRequestData: UserDto = {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "johndoe@spidermail.com",
      password: "StrongAndComplicatedPassword123!",
    };
    mockUserRepository.add = vi.fn().mockImplementation((user: User) => {
      return success(user);
    });
    const result = await createUserUseCase.execute(mockRequestData);
    console.log(JSON.stringify(result, null, 2));
    expect(result.isSuccess).toBe(true);
  });

  test("should return failure response", async () => {
    const mockRequestData: UserDto = {
      firstName: "John",
      lastName: "D",
      username: "j",
      email: "johndoe@spidermail",
      password: "invalidpassword",
    };

    mockUserRepository.add = vi.fn().mockImplementation((user: User) => {
      return success(user);
    });
    const result = await createUserUseCase.execute(mockRequestData);
    console.log(JSON.stringify(result, null, 2));
    expect(result.isSuccess).toBe(false);
  });

  test("should fail to create a user as the email is already in use", async () => {
    const mockRequestData: UserDto = {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "johndoe@spidermail.com",
      password: "StrongAndComplicatedPassword123!",
    };
    mockUserRepository.findByEmail = vi
      .fn()
      .mockImplementation((user: User) => {
        return user;
      });
    const result = await createUserUseCase.execute(mockRequestData);
    expect(result.isSuccess).toBe(false);
    const resultError = result as Failure<EmailAlreadyInUseError>;
    expect(resultError.error.message).toBe(
      "Cannot create a user with an email already in use, please provide a valid email address."
    );
  });

  test("should fail to create a user as the username provided is already in use", async () => {
    const mockRequestData: UserDto = {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "johndoe@spidermail.com",
      password: "StrongAndComplicatedPassword123!",
    };
    mockUserRepository.findByUsername = vi
      .fn()
      .mockImplementation((user: User) => {
        return user;
      });
    const result = await createUserUseCase.execute(mockRequestData);
    expect(result.isSuccess).toBe(false);
    const resultError = result as Failure<UsernameAlreadyInUseError>;
    expect(resultError.error.message).toBe(
      "Cannot create a user with a username already in use, please provide a valid username."
    );
  });
});
