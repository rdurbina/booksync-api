//IMPLEMENT GLOBAL EXCEPTION HANDLER FOR THIS TYPES OF ERRORS

export default class InternalDomainError extends Error {
  constructor(public readonly debugMessage: string) {
    super();
  }
}
