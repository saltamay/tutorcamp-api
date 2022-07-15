import express from 'express';
const router = express.Router();
import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} from '../controllers/bootcamps.controller.js';
import { coursesRouter } from './courses.route.js';

// Resource routers
router.use('/:bootcampId/courses', coursesRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router.route('/').get(getBootcamps).post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

export { router as bootcampsRouter };
