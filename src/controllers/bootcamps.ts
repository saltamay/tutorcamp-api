import { Request, Response, NextFunction } from 'express';

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
export const getBootcamps = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    success: true,
    msg: 'Show all bootcamps',
  });
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
export const getBootcamp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    success: true,
    msg: `Show bootcamp ${req.params.id}`,
  });
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
export const createBootcamp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    success: true,
    msg: 'Create a bootcamp',
  });
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
export const updateBootcamp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    success: true,
    msg: `Update bootcamp ${req.params.id}`,
  });
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
export const deleteBootcamp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    success: true,
    msg: `Delete bootcamp ${req.params.id}`,
  });
};
