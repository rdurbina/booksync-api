export default abstract class AppError extends Error {
  constructor(
    readonly title: string,
    readonly message: string,
    readonly errors?: Error[]
  ) {
    super(message);
  }
}
