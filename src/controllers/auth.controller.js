import { asyncHandler } from '../middleware/asyncHandler.js';

/**
 * @desc    Register user
 * @route   GET /api/v1/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});
