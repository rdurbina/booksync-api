import AppError from "./AppError.js";

export default class UnexpectedError extends AppError {
  readonly errorType: string = "UnexpectedError";
}
