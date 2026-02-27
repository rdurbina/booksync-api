import { describe, expect, test, vi, beforeEach, assert } from "vitest";
import IUserRepository from "../../application/repositories/IUserRepository";
import CreateUserUseCase from "../../application/use-cases/user/CreateUserUseCase";
import IRoleRepository from "../../application/repositories/IRoleRepository";
import CreateUserRequest from "../../application/dtos/user/requests/CreateUserRequest";
import Role from "../../domain/role/Role";
import UserResponse from "../../application/dtos/user/responses/UserResponse";
import ApplicationErrorCodes from "../../application/errors/ApplicationErrorCodes";
import { getMockUser } from "./UserTestUtils";

describe("CreateUserUseCase", () => {
  let mockUserRepository: IUserRepository;
  let mockRoleRepository: IRoleRepository;
  let createUserUseCase: CreateUserUseCase;
  let defaultRole: Role;
  beforeEach(() => {
    mockUserRepository = {
      add: vi.fn(),
      findById: vi.fn(),
      findByEmail: vi.fn(),
      findByUsername: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
      updateBorrowCode: vi.fn(),
    };

    mockRoleRepository = {
      findById: vi.fn(),
      findByName: vi.fn(),
      getDefaultRole: vi.fn(),
    };

    createUserUseCase = new CreateUserUseCase(
      mockUserRepository,
      mockRoleRepository,
    );

    defaultRole = Role.create(1, "USER");
    mockRoleRepository.getDefaultRole = vi.fn().mockResolvedValue(defaultRole);
  });

  test("should return a successful response", async () => {
    const mockRequestData: CreateUserRequest = {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "johndoe@spidermail.com",
      password: "StrongAndComplicatedPassword123!",
    };
    
    mockUserRepository.findByEmail = vi.fn().mockResolvedValue(null);
    mockUserRepository.findByUsername = vi.fn().mockResolvedValue(null);
    mockUserRepository.add = vi.fn().mockResolvedValue(1);
    mockUserRepository.updateBorrowCode = vi
      .fn()
      .mockResolvedValue(getMockUser());

    const result = await createUserUseCase.execute(mockRequestData);

    if (!result.isSuccess) assert.fail("result.isSuccess should be true");

    expect(result.isSuccess).toBe(true);
    expect(mockRoleRepository.getDefaultRole).toHaveBeenCalled();
    expect(mockUserRepository.findByEmail).toHaveBeenCalled();
    expect(mockUserRepository.findByUsername).toHaveBeenCalled();
    expect(mockUserRepository.add).toHaveBeenCalled();
    expect(mockUserRepository.updateBorrowCode).toHaveBeenCalled();
    expect(result.value).toBeInstanceOf(UserResponse);
  });

  test("should return failure response", async () => {
    const mockRequestData: CreateUserRequest = {
      firstName: "John",
      lastName: "D",
      username: "j",
      email: "johndoe@spidermail",
      password: "invalidpassword",
    };

    mockUserRepository.add = vi.fn().mockResolvedValue(1);
    mockUserRepository.findByEmail = vi.fn().mockResolvedValue(null);
    mockUserRepository.findByUsername = vi.fn().mockResolvedValue(null);

    const result = await createUserUseCase.execute(mockRequestData);

    if (result.isSuccess) assert.fail("result.isSuccess should be false");
    expect(result.isSuccess).toBe(false);
    expect(result.error.ErrorCode).toBe(ApplicationErrorCodes.ValidationError);
  });

  test("should fail to create a user as the email is already in use", async () => {
    const mockRequestData: CreateUserRequest = {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "johndoe@spidermail.com",
      password: "StrongAndComplicatedPassword123!",
    };
    //Repository won't return null, null check will fail
    mockUserRepository.findByEmail = vi
      .fn()
      .mockResolvedValue(getMockUser());

    const result = await createUserUseCase.execute(mockRequestData);

    if (result.isSuccess) assert.fail("result.isSuccess should be false");
    expect(mockUserRepository.findByEmail).toHaveBeenCalled();
  });

  test("should fail to create a user as the username provided is already in use", async () => {
    const mockRequestData: CreateUserRequest = {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "johndoe@spidermail.com",
      password: "StrongAndComplicatedPassword123!",
    };
    //Repository won't return null, null check will fail
    mockUserRepository.findByUsername = vi
      .fn()
      .mockResolvedValue(getMockUser())

    const result = await createUserUseCase.execute(mockRequestData);

    if (result.isSuccess) assert.fail("result.isSuccess should be false");
    expect(mockUserRepository.findByUsername).toHaveBeenCalled();
  });
});
