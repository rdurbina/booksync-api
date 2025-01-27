import User from "../../entities/UserEntity.js"

export default interface IUserService {
    createUser(user: User): boolean;
    deleteUser(userId: number): boolean;
}