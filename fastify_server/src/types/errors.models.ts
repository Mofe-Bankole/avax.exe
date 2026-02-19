export class AppError extends Error {
    constructor(public message: string , public statusCode : number , public isOperational : boolean) {
        super(message);
        this.name = 'AppError';
    }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}