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
import { Bootcamp } from '../models/bootcamp.model.js';
import { coursesRouter } from './courses.route.js';

// Resource routers
bootcampsRouter.use('/:bootcampId/courses', coursesRouter);

bootcampsRouter.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
bootcampsRouter
  .route('/')
  .get(filterHandler(Bootcamp, 'courses'), getBootcamps)
  .post(authProtect, createBootcamp);

bootcampsRouter
  .route('/:id')
  .get(getBootcamp)
  .put(authProtect, updateBootcamp)
  .delete(authProtect, deleteBootcamp);

export { bootcampsRouter };
