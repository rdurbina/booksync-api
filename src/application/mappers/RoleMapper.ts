import Role from "../../domain/role/Role"
import RoleResponse from "../dtos/role/responses/RoleResponse"

const RoleMapper = {
    toResponse(role: Role): RoleResponse {
        return new RoleResponse(role.id, role.name)
    }
}

export default RoleMapper;