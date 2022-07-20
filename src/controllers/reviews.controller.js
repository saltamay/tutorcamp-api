import { asyncHandler } from '../middleware/asyncHandler.js';
import { Bootcamp, Review } from '../models/index.js';
import { ErrorResponse, createPagination, parseQuery } from '../utils/index.js';

/**
 * @desc    Get all reviews
 * @route   GET /api/v1/reviews
 * @access  Public
 */
const getAllReviews = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.results);
});

/**
 * @desc    Get all reviews of a bootcamp
 * @route   GET /api/v1/bootcamps/:bootcampId/reviews
 * @access  Public
 */
const getBootcampReviews = asyncHandler(async (req, res, next) => {
  const { limit, page } = parseQuery(req.query);

  const reviews = await Review.find({ bootcamp: req.params.bootcampId });

  const pagination = await createPagination({
    count: reviews.length,
    page,
    limit,
  });

  res.status(200).json({
    success: true,
    pagination,
    data: reviews,
  });
});

export const getReviews = (req, res, next) => {
  if (req.params.bootcampId) {
    return getBootcampReviews(req, res, next);
  } else {
    return getAllReviews(req, res, next);
  }
};
