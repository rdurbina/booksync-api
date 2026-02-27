export default class ConflictError extends Error {
    constructor(
        public readonly field: string
    ) {
        super();
    }
}