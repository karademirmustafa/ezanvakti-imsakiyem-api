export class NotFoundError extends Error {
    statusCode: number;
  
    constructor(message: string = "Resource not found") {
      super(message);
      this.name = "NotFoundError";
      this.statusCode = 404;
    }
  }
  