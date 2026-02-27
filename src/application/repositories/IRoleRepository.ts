import Role from "../../domain/role/Role";

export default interface IRoleRepository {
    findById(id: number): Promise<Role>;
    findByName(name: string): Promise<Role | null>;
    getDefaultRole(): Promise<Role>;
}