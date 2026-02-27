import ConflictError from "./ConflictError";

export default class ConflictAggregateError extends Error {
  constructor(public readonly errors: ConflictError[]) {
    super();
  }
}
