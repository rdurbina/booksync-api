export default class ResponseError extends Error {
  constructor(
    readonly title: string,
    readonly message: string,
    readonly statusCode: number,
    readonly errors: Error[]
  ) {
    super(message);
  }
}
