import { Bootcamp } from '../models/index.js';
import { bootcamps } from '../routes/bootcamps.route.js';

/**
 * @desc    Get all bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
export const getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find({}).exec();

    res.status(200).json({ success: true, data: bootcamps });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false });
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

    if (!bootcamp) return res.status(404).json({ success: false });

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false });
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
    console.log(err.message);
    res.status(400).json({ success: false });
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

    if (!bootcamp) return res.status(404).json({ success: false });

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    console.log(err.message);
    res.status(400).json({ success: false });
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

    if (!bootcamp) return res.status(404).json({ success: false });

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false });
  }
};
