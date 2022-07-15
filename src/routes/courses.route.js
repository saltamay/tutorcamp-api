import express from 'express';
const coursesRouter = express.Router({ mergeParams: true });
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from '../controllers/courses.controller.js';

coursesRouter.route('/').get(getCourses).post(createCourse);
coursesRouter
  .route('/:id')
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

export { coursesRouter };
