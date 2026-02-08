import { failure, Result, success } from "../../shared/result/Result";
import ValidationDomainError from "../errors/base/ValidationError";

export default class Role {
  private constructor(
    public readonly _id: number,
    public readonly _name: string,
  ) {}

  static validate(id: number, name: string): string[] {
    const errors: string[] = [];

    if (!Number.isInteger(id)) {
      errors.push("The value of the ID is not an integer");
    }

    if (!name || name.trim().length == 0)
      errors.push("The name of the role cannot be empty");
    return errors;
  }

  static create(id: number, name: string): Result<Role, ValidationDomainError> {
    const errors: string[] = this.validate(id, name);
    if (errors.length > 0) {
      return failure(
        new ValidationDomainError(
          "Cannot create instance of the role object",
          errors,
        ),
      );
    }
    return success(new Role(id, name));
  }
}
