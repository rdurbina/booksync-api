export default class RepositoryError extends Error {
  constructor(public readonly code: string) {
    super();
  }
}
