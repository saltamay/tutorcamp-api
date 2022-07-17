import jwt from 'jsonwebtoken';
import { asyncHandler } from './asyncHandler.js';
import { ErrorResponse } from '../utils/index.js';
import { User } from '../models/index.js';

const JWT_SECRET = process.env.JWT_SECRET;

const getTokenFromHeaders = (headers) => {
  if (!headers.authorization || !headers.authorization.startsWith('Bearer'))
    return;

  return headers.authorization.split(' ')[1];
};

export const authProtect = asyncHandler(async (req, res, next) => {
  let token = getTokenFromHeaders(req.headers);

  // if (req.cookies.token) {
  //   token = req.cookies.token
  // }
  if (!token) return next(new ErrorResponse('Unauthorized', 401));

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse('Unauthorized', 401));
  }
});
