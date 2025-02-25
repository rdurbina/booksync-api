export class Success<T> {
  readonly isSuccess = true;
  constructor(public readonly value: T) {}
}

export class Failure<E extends Error = Error> {
  readonly isSuccess = false;
  constructor(public readonly error: E) {}
}

export type Result<T, E extends Error = Error> = Success<T> | Failure<E>;

export const success = <T, E extends Error>(value: T): Result<T, E> =>
  new Success(value);
export const failure = <T, E extends Error>(error: E): Result<T, E> =>
  new Failure(error);
