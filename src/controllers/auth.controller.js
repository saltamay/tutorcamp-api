import { asyncHandler } from '../middleware/asyncHandler.js';
import { User } from '../models/user.model.js';
import { ErrorResponse } from '../utils/errorResponse.js';

/**
 * @desc    Register user
 * @route   GET /api/v1/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

/**
 * @desc    Login user
 * @route   GET /api/v1/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorResponse('Please provide an email and password', 400));

  const user = await User.findOne({
    email,
  }).select('+password');

  if (!user) return next(new ErrorResponse('Invalid credentials', 401));

  const isPasswordValid = await user.matchPassword(password);

  if (!isPasswordValid)
    return next(new ErrorResponse('Invalid credentials', 401));

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
