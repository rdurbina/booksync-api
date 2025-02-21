import ArgumentError from "./ArgumentError";

export default class Result<T> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly value?: T,
    public readonly error?: Error
  ) {
    if (
      (isSuccess && error !== undefined) ||
      (!isSuccess && error === undefined)
    ) {
      throw new ArgumentError(
        "Invalid arguments: success must not include an error and failure must include an error"
      );
    }
  }

  static success<T>(value: T): Result<T> {
    return new Result<T>(true, value, undefined);
  }

  static failure<T>(error: Error): Result<T> {
    return new Result<T>(false, undefined, error);
  }
}
