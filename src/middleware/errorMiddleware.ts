import { ErrorResponse } from './../utils/ErrorResponse';
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
  // log error
  console.log(`Error: ${err.message}`);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message
  });
}