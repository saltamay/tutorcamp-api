import { Bootcamp } from '../models/index.js';
import { bootcamps } from '../routes/bootcamps.route.js';
import { ErrorResponse } from '../utils/errorResponse.js';

/**
 * @desc    Get all bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
export const getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find({});

    res.status(200).json({ success: true, data: bootcamps });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get a bootcamp by id
 * @route   GET /api/v1/bootcamps/:id
 * @access  Public
 */
export const getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp with the id of ${req.params.id} not found`,
          404
        )
      );
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create a new bootcamp
 * @route   POST /api/v1/bootcamps
 * @access  Private
 */
export const createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create a bootcamp by id
 * @route   PUT /api/v1/bootcamps/:id
 * @access  Private
 */
export const updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp with the id of ${req.params.id} not found`,
          404
        )
      );
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(err);
  }
};

/**
 * @desc    Delete a bootcamp by id
 * @route   PUT /api/v1/bootcamps/:id
 * @access  Private
 */
export const deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findOneAndDelete(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp with the id of ${req.params.id} not found`,
          404
        )
      );
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};
