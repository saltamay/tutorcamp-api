import { ErrorResponse } from '../utils/errorResponse.js';

export const errorHandler = (err, req, res, next) => {
  let errors = [];

  // Default error
  let error = { ...err };
  error.message = err.message;

  console.error(err.stack.red);

  // Mongo invalid ObjectId error
  if (err.name === 'CastError') {
    error = new ErrorResponse(`Invalid resource id: ${err.value}`, 400);
  }

  // Mongo duplicate key error
  if (err.name === 'MongoServerError' && err.code === 11000) {
    const [name, value] = err.keyValue && Object.entries(err.keyValue)?.[0];
    error = new ErrorResponse(`Validation Error`, 400);

    errors = [
      {
        message: `${name}: ${value} already exist`,
        path: name,
        value,
      },
    ];
  }

  if (err.name === 'ValidationError') {
    error = new ErrorResponse(`Validation Error`, 400);

    errors = Object.values(err.errors).map((error) => {
      const { message, path, value } = error.properties;
      return {
        message,
        path,
        value,
      };
    });
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, message: error.message || 'Server Error', errors });
};
