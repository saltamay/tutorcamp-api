import { ErrorResponse } from '../utils/errorResponse.js';

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(err.stack.red);

  if (err.name === 'CastError') {
    error = new ErrorResponse(`Invalid resource id: ${err.value}`, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' });
};
