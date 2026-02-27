export class Success<T> {
  readonly isSuccess = true;
  constructor(public readonly value: T) {}
}

export class Failure<E extends Error = Error> {
  readonly isSuccess = false;
  constructor(public readonly error: E) {}
}

export type Result<T, E extends Error = Error> = Success<T> | Failure<E>;

export const success = <T>(value: T): Result<T, never> =>
  new Success(value);
export const failure = <E extends Error>(error: E): Result<never, E> =>
  new Failure(error);

export const completed = (): Result<undefined, never> => new Success(undefined);
