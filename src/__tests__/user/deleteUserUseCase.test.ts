import { describe } from "node:test";
import IUserRepository from "../../application/repositories/IUserRepository";
import { assert, beforeEach, expect, test, vi } from "vitest";
import DeleteUserUseCase from "../../application/use-cases/user/DeleteUserUseCase";
import { getMockRepository, getMockUser } from "./UserTestUtils";
import ApplicationErrorCodes from "../../application/errors/ApplicationErrorCodes";

describe("DeleteUserUseCase", () => {
  let mockUserRepository: IUserRepository;
  let deleteUserUseCase: DeleteUserUseCase;
  beforeEach(() => {
    mockUserRepository = getMockRepository();
    deleteUserUseCase = new DeleteUserUseCase(mockUserRepository);
  });

  test("should succeed in deleting a user and return a successful response", async () => {
    const mockId: number = 1;
    mockUserRepository.findById = vi.fn().mockResolvedValue(null);
    const result = await deleteUserUseCase.execute(mockId);

    expect(result.isSuccess).toBe(true);
    expect(mockUserRepository.findById).toHaveBeenCalled();
  });

  test("should return a failure response", async () => {
    const mockId: number = 1;
    mockUserRepository.findById = vi.fn().mockResolvedValue(getMockUser());
    const result = await deleteUserUseCase.execute(mockId);

    if (result.isSuccess) assert.fail('result.isSuccess should be false');
    expect(mockUserRepository.findById).toHaveBeenCalled();
    expect(result.error.ErrorCode).toBe(ApplicationErrorCodes.NotFoundError)
  });
});
