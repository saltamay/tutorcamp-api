import express from 'express';
const reviewsRouter = express.Router({ mergeParams: true });
import { getReviews } from '../controllers/reviews.controller.js';
import { Review } from '../models/review.model.js';
import { filterHandler } from '../middleware/filterHandler.js';

reviewsRouter.route('/').get(filterHandler(Review, 'bootcamp'), getReviews);

export { reviewsRouter };
