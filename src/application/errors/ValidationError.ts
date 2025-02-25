import AppError from "./base/AppError.js";

export default class ValidationError extends AppError {
  readonly errorType: string = "ValidationError";
}
