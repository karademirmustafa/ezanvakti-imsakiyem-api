export class ValidationError extends Error {
    statusCode: number;
    errors: any[];
  
    constructor(errors: any[], message: string = "Validation failed") {
      super(message);
      this.name = "ValidationError";
      this.statusCode = 400;
      this.errors = errors;
    }
  }