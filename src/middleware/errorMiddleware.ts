import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // log error
  console.log(`Server Error: ${err.message}`);

  res.status(500).json({
    success: false,
    message: err.message
  });
}