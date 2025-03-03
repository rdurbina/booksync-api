import { describe } from "node:test";
import IUserRepository from "../application/repositories/IUserRepository";
import { beforeEach, expect, test, vi } from "vitest";
import RepositoryError from "../application/errors/RepositoryError";
import ErrorCodes from "../application/errors/enums/ErrorCodes";
import DeleteUserUseCase from "../application/use-cases/user/DeleteUserUseCase";
import { failure, Failure, success } from "../shared/result/Result";
import UserNotFoundError from "../application/errors/UserNotFoundError";

describe("DeleteUserUseCase", () => {
  let mockUserRepository: IUserRepository;
  let deleteUserUseCase: DeleteUserUseCase;
  beforeEach(() => {
    mockUserRepository = {
      add: vi.fn(),
      findById: vi.fn(),
      findByEmail: vi.fn(),
      findByUsername: vi.fn(),
      delete: vi.fn(),
    };
    deleteUserUseCase = new DeleteUserUseCase(
      mockUserRepository as IUserRepository
    );
  });
  test("should succeed in deleting a user and return undefined", async () => {
    const mockId = "605c72ef1532071c2fabc9f2";
    mockUserRepository.delete = vi.fn().mockResolvedValue(success(undefined));
    const result = await deleteUserUseCase.execute(mockId);
    expect(result.isSuccess).toBe(true);
  });
  test("should return a UserNotFoundError when trying to delete a user", async () => {
    const mockId = "605c72ef1532071c2fabc9f2";
    mockUserRepository.delete = vi
      .fn()
      .mockResolvedValue(
        failure(new RepositoryError(ErrorCodes.NotFoundError))
      );
    const result = await deleteUserUseCase.execute(mockId);
    const resultError = result as Failure<UserNotFoundError>;
    expect(result.isSuccess).toBe(false);
    expect(resultError.error).toBeInstanceOf(UserNotFoundError);
  });
});
