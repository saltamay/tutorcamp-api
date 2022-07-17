import { ErrorResponse } from '../utils/index.js';

export const roleHandler =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new ErrorResponse('Not authroized', 403));

    next();
  };
