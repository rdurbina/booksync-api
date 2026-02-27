import Role from "../role/Role";

export interface CreateUserProps {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface fromPersistenceProps {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  borrowCode: string;
  id: number;
}
