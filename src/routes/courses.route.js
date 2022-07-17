import express from 'express';
const coursesRouter = express.Router({ mergeParams: true });
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from '../controllers/courses.controller.js';
import { filterHandler } from '../middleware/filterHandler.js';
import { authProtect } from '../middleware/authProtect.js';
import { roleHandler } from '../middleware/roleHandler.js';
import { Course } from '../models/course.model.js';

coursesRouter
  .route('/')
  .get(filterHandler(Course, 'bootcamp'), getCourses)
  .post(authProtect, roleHandler('publisher', 'admin'), createCourse);
coursesRouter
  .route('/:id')
  .get(getCourse)
  .put(authProtect, roleHandler('publisher', 'admin'), updateCourse)
  .delete(authProtect, roleHandler('publisher', 'admin'), deleteCourse);

export { coursesRouter };
