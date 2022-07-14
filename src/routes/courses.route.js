import express from 'express';
const router = express.Router({ mergeParams: true });
import { getCourses } from '../controllers/courses.controller.js';

router.route('/').get(getCourses);

export { router as coursesRouter };
