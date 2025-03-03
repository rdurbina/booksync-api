export default class RepositoryError extends Error {
  constructor(readonly errorCode: number) {
    super();
  }
}
