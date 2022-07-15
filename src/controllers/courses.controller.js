import { asyncHandler } from '../middleware/asyncHandler.js';
import { Bootcamp } from '../models/bootcamp.model.js';
import { Course } from '../models/course.model.js';
import { createPagination, ErrorResponse, parseQuery } from '../utils/index.js';

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

/**
 * @desc    Get a course by id
 * @route   GET /api/v1/course/:id
 * @access  Public
 */
export const getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate(
    'bootcamp',
    'name description'
  );

  if (!course) {
    return next(
      new ErrorResponse(`Course with the id of ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: course });
});

/**
 * @desc    Create a new course
 * @route   POST /api/v1/bootcamps/:bootcampId/courses
 * @access  Private
 */
export const createCourse = asyncHandler(async (req, res, next) => {
  const { bootcampId } = req.params;

  const bootcamp = await Bootcamp.findById(bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with the id of ${bootcampId} not found`, 404)
    );
  }
  const course = await Course.create({
    ...req.body,
    bootcamp: bootcampId,
  });

  res.status(201).json({ success: true, data: course });
});

/**
 * @desc    Update a course by id
 * @route   PUT /api/v1/courses/:id
 * @access  Private
 */
export const updateCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return next(
      new ErrorResponse(`Course with the id of ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: course });
});

/**
 * @desc    Delete a course by id
 * @route   DELETE /api/v1/course/:id
 * @access  Private
 */
export const deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`Course with the id of ${req.params.id} not found`, 404)
    );
  }

  course.remove();
  res.status(200).json({ success: true, data: course });
});
