import { asyncHandler } from '../middleware/asyncHandler.js';
import { User } from '../models/user.model.js';

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

  res.status(200).json({ success: true });
});
