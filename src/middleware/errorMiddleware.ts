import { ErrorResponse } from './../utils/ErrorResponse';
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: Error | ErrorResponse, req: Request, res: Response, next: NextFunction) => {
  // Log error stack
  console.log(`Error: ${req.params}`);
  console.log(err.name)

  let error = new ErrorResponse(err.message);
  
  // Bad object id (CastError)
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message
  });
}