import AppError from "./AppError.js";

export default class ValidationError extends AppError {
  readonly errorType: string = "ValidationError";
}
