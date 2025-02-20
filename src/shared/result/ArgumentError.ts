export default class ArgumentError extends Error {
  public readonly name: string = "ArgumentError";
  constructor(public message: string) {
    super(message);
  }
}
