import express from 'express';
const bootcampsRouter = express.Router();
import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} from '../controllers/bootcamps.controller.js';
import { filterHandler } from '../middleware/filterHandler.js';
import { authProtect } from '../middleware/authProtect.js';
import { roleHandler } from '../middleware/roleHandler.js';
import { Bootcamp } from '../models/bootcamp.model.js';
import { coursesRouter } from './courses.route.js';
import { reviewsRouter } from './reviews.route.js';

// Resource routers
bootcampsRouter.use('/:bootcampId/courses', coursesRouter);
bootcampsRouter.use('/:bootcampId/reviews', reviewsRouter);

bootcampsRouter.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
bootcampsRouter
  .route('/')
  .get(filterHandler(Bootcamp, 'courses'), getBootcamps)
  .post(authProtect, roleHandler('publisher', 'admin'), createBootcamp);

bootcampsRouter
  .route('/:id')
  .get(getBootcamp)
  .put(authProtect, roleHandler('publisher', 'admin'), updateBootcamp)
  .delete(authProtect, roleHandler('publisher', 'admin'), deleteBootcamp);

export { bootcampsRouter };
