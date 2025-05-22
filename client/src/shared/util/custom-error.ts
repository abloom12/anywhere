export class CustomError extends Error {
  constructor(name: string, message: string) {
    super(message);

    this.name = name;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, new.target);
    }
  }
}
