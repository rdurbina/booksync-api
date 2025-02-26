import { describe, expect, test, vi, beforeEach } from "vitest";
import UserDto from "../application/dtos/UserDto";
import IUserRepository from "../application/repositories/IUserRepository";
import User from "../domain/user/User";
import { success } from "../shared/result/Result";
import CreateUserUseCase from "../application/use-cases/user/CreateUserUseCase";

describe("CreateUserUseCase", () => {
  let mockUserRepository: IUserRepository;
  let createUserUseCase: CreateUserUseCase;
  beforeEach(() => {
    mockUserRepository = {
      add: vi.fn(),
      findById: vi.fn(),
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
      password: "invld",
    };

    mockUserRepository.add = vi.fn().mockImplementation((user: User) => {
      return success(user);
    });
    const result = await createUserUseCase.execute(mockRequestData);
    console.log(JSON.stringify(result, null, 2));
    expect(result.isSuccess).toBe(false);
  });
});
