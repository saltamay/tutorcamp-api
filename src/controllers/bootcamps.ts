import { Request, Response, NextFunction } from 'express';
import Bootcamp from '../models/Bootcamp';
/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @description     Get all bootcamps
 * @route           GET /api/v1/bootcamps
 * @access          Public
 */
export const getBootcamps = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bootcamps = await Bootcamp.find();

    res.status(200).json({
      count: bootcamps.length,
      success: true,
      data: bootcamps,
    });
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(400).json({
      succes: false,
    });
  }
};

/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @description     Get a single bootcamp
 * @route           GET /api/v1/bootcamps/:id
 * @access          Public
 */
export const getBootcamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) return res.status(400).json({ success: false });

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    // console.log(`Error: ${err.message}`);
    // res.status(400).json({
    //   succes: false,
    // });
    next(err);
  }
};

/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @description     Create new bootcamp
 * @route           POST /api/v1/bootcamps
 * @access          Private
 */
export const createBootcamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    console.log(`Cannot create bootcamp: ${err.message}`);
    res.status(400).json({
      success: false,
      data: null,
    });
  }
};

/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @description     Update a bootcamp
 * @route           PUT /api/v1/bootcamps/:id
 * @access          Private
 */
export const updateBootcamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) return res.status(400).json({ success: false });

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(400).json({
      success: false,
    });
  }
};

/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @description     Delete a bootcamp
 * @route           DELETE /api/v1/bootcamps/:id
 * @access          Private
 */
export const deleteBootcamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) return res.status(400).json({ success: false });

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(400).json({
      success: false,
    });
  }
};
