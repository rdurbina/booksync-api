import { describe, expect, test, vi, beforeEach } from "vitest";
import UserDto from "../application/dtos/UserDto";
import IUserRepository from "../application/repositories/IUserRepository.js";
import User from "../domain/user/User";
import { Result, success } from "../shared/result/Result";
import CreateUserUseCase from "../application/use-cases/user/CreateUserUseCase";

describe("CreateUserUseCase", () => {
  let mockUserRepository: IUserRepository;
  beforeEach(() => {
    mockUserRepository = {
      add: vi.fn(),
      findById: vi.fn(),
      findByUsername: vi.fn(),
      delete: vi.fn(),
    };
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
    const createUserUseCase = new CreateUserUseCase(
      mockUserRepository as IUserRepository
    );
    const result = await createUserUseCase.execute(mockRequestData);
    console.log(JSON.stringify(result));
    expect(result.isSuccess).toBe(true);
  });
});
