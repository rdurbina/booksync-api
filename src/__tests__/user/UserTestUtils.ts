import User from "../../domain/user/User";
import UserResponse from "../../application/dtos/user/responses/UserResponse";
import IUserRepository from "../../application/repositories/IUserRepository";
import { vi } from "vitest";
import Role from "../../domain/role/Role";

export function getDefaultRole(): Role {
  return Role.create(1, "USER");
}

export function getMockRepository(): IUserRepository {
  return {
    add: vi.fn(),
    findById: vi.fn(),
    findByEmail: vi.fn(),
    findByUsername: vi.fn(),
    delete: vi.fn(),
    update: vi.fn(),
    updateBorrowCode: vi.fn(),
  };
}

export function getMockUserResponse(): UserResponse {
  return new UserResponse(
    1,
    "John",
    "Doe",
    "johndoe",
    "johndoe@spidermail.com",
    "$2b$10$eImiTXuWVxfM37uY4JANjQ==examplehashedvalue1234567890abcd",
    "B-JO-DO-1",
    getDefaultRole(),
  );
}

export function  getMockUser(): User {
  return User.fromPersistence({
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "johndoe@spidermail.com",
    password: "StrongAndComplicatedPassword123!",
    role: getDefaultRole(),
    borrowCode: "B-JO-DOE-1",
    id: 1,
  });
}