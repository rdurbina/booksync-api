export default abstract class AppError extends Error {
  constructor(
    readonly title: string,
    readonly message: string,
    readonly errors?: Error[]
  ) {
    super(message);
  }

  toJSON() {
    return {
      title: this.title,
      message: this.message,
      errors: this.errors,
    };
  }
}
