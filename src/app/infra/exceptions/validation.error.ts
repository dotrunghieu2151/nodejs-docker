export class ValidationError extends Error {
  statusCode = 422;
  errors: any;
  constructor(message: string, errors: any) {
    super(message);
    this.errors = errors;
  }
}
