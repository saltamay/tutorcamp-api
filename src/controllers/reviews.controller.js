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

/**
 * @desc    Get a review by id
 * @route   GET /api/v1/reviews/:id
 * @access  Public
 */
export const getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate(
    'bootcamp',
    'name description'
  );

  if (!review) {
    return next(
      new ErrorResponse(`Review with the id of ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: review });
});

/**
 * @desc    Update a review by id
 * @route   PUT /api/v1/review/:id
 * @access  Private
 */
export const updateReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    return next(
      new ErrorResponse(`Review with the id of ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: review });
});

/**
 * @desc    Delete a review by id
 * @route   DELETE /api/v1/delete/:id
 * @access  Private
 */
export const deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`Course with the id of ${req.params.id} not found`, 404)
    );
  }

  review.remove();

  res.status(200).json({ success: true, data: review });
});
