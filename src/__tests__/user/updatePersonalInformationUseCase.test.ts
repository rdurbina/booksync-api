// import { beforeEach, describe, expect, test, vi } from "vitest";
// import UpdatePersonalInformationUseCase from "../application/use-cases/user/UpdatePersonalInformationUseCase";
// import IUserRepository from "../application/repositories/IUserRepository";
// import UserDto from "../application/dtos/UserDto";
// import MissingIdError from "../application/errors/MissingIdError";
// import { Failure, Success } from "../result/Result";
// import NotFoundError from "../application/errors/base/NotFoundError";
// import User from "../domain/user/User";
// import ValidationError from "../application/errors/base/ValidationError";

// describe("UpdatePersonalInformationUseCase", () => {
//   let mockUserRepository: IUserRepository;
//   let updatePersonalInformationUseCase: UpdatePersonalInformationUseCase;
//   beforeEach(() => {
//     mockUserRepository = {
//       add: vi.fn(),
//       findById: vi.fn(),
//       findByEmail: vi.fn(),
//       findByUsername: vi.fn(),
//       delete: vi.fn(),
//       update: vi.fn(),
//     };
//     updatePersonalInformationUseCase = new UpdatePersonalInformationUseCase(
//       mockUserRepository as IUserRepository
//     );
//   });
//   test("should return MissingIdError if the id provided is empty, null or undefined", async () => {
//     const mockRequestData: UserDto = {
//       id: "",
//       firstName: "John",
//       lastName: "Doe",
//       username: "johndoe",
//       email: "johndoe@spidermail.com",
//       password: "StrongAndComplicatedPassword123!",
//     };
//     const result = await updatePersonalInformationUseCase.execute(
//       mockRequestData
//     );
//     expect(result.isSuccess).toBe(false);
//     const resultError = result as Failure<MissingIdError>;
//     expect(resultError.error).toBeInstanceOf(MissingIdError);
//   });

//   test("should return NotFoundError", async () => {
//     const mockRequestData: UserDto = {
//       id: "507f1f77bcf86cd799439011",
//       firstName: "J",
//       lastName: "",
//       username: "johndoe",
//       email: "johndoe@spidermail.com",
//       password: "StrongAndComplicatedPassword123!",
//     };

//     mockUserRepository.findById = vi.fn().mockResolvedValue(null);

//     const result = await updatePersonalInformationUseCase.execute(
//       mockRequestData
//     );
//     expect(result.isSuccess).toBe(false);
//     const resultError = result as Failure<NotFoundError>;
//     expect(resultError.error).toBeInstanceOf(NotFoundError);
//   });

//   test("should fail to update personal information", async () => {
//     const mockRequestData: UserDto = {
//       id: "507f1f77bcf86cd799439011",
//       firstName: "J",
//       lastName: "",
//       username: "johndoe",
//       email: "johndoe@spidermail.com",
//       password: "StrongAndComplicatedPassword123!",
//     };

//     const mockUser = User.createWithAllProperties(
//       "John",
//       "Doe",
//       "johndoe",
//       "johndoe@spidermail.com",
//       "StrongAndComplicatedPassword123!",
//       false,
//       "507f1f77bcf86cd799439011"
//     ) as Success<User>;

//     const mockRepositoryResponse = mockUser.value;

//     mockUserRepository.findById = vi
//       .fn()
//       .mockResolvedValue(mockRepositoryResponse);

//     const result = await updatePersonalInformationUseCase.execute(
//       mockRequestData
//     );

//     expect(result.isSuccess).toBe(false);
//     const resultError = result as Failure<ValidationError>;
//     expect(resultError.error).toBeInstanceOf(ValidationError);
//   });
// });
