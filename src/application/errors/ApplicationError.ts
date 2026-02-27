//Error wrapper class

export default class ApplicationError extends Error {
  constructor(
    public readonly ErrorCode: string,
    public readonly details: unknown,
  ) {
    super();
  }
}
