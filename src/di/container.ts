import { Container } from "inversify";
import IUserRepository from "../domain/repositories/IUserRepository";
import { DI_TYPES } from "./types.js";
import MongoUserRepositoryImpl from "../infrastructure/repositories/MongoUserRepositoryImpl.js";
import CreateUserUseCase from "../application/use-cases/user/CreateUserUseCase.js";
import UserController from "../presentation/controllers/UserController.js";

export const container = new Container({
    defaultScope: "Singleton"
})

//Bindings
container.bind<IUserRepository>(DI_TYPES.UserRepository).to(MongoUserRepositoryImpl);
container.bind<CreateUserUseCase>(CreateUserUseCase).toSelf();
container.bind<UserController>(UserController).toSelf();