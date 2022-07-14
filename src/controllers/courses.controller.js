import { asyncHandler } from '../middleware/asyncHandler.js';
import { Course } from '../models/course.model.js';
import { createPagination, parseQuery } from '../utils/index.js';

/**
 * @desc    Get all courses
 * @route   GET /api/v1/courses
 * @access  Public
 */
const getAllCourses = asyncHandler(async (req, res, next) => {
  const { limit, page } = parseQuery(req.query);

  const courses = await Course.find({}).populate('bootcamp');

  const pagination = await createPagination({
    count: courses.length,
    page,
    limit,
  });

  res.status(200).json({
    success: true,
    pagination,
    data: courses,
  });
});

/**
 * @desc    Get all courses of a bootcamp
 * @route   GET /api/v1/bootcamps/:bootcampId/courses
 * @access  Public
 */
const getBootcampCourses = asyncHandler(async (req, res, next) => {
  const { limit, page } = parseQuery(req.query);

  const courses = await Course.find({ bootcamp: req.params.bootcampId });

  const pagination = await createPagination({
    count: courses.length,
    page,
    limit,
  });

  res.status(200).json({
    success: true,
    pagination,
    data: courses,
  });
});

export const getCourses = (req, res, next) => {
  if (req.params.bootcampId) {
    return getBootcampCourses(req, res, next);
  } else {
    return getAllCourses(req, res, next);
  }
};
