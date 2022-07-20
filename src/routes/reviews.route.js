import express from 'express';
const reviewsRouter = express.Router({ mergeParams: true });
import { deleteReview, getReview, getReviews, updateReview } from '../controllers/reviews.controller.js';
import { Review } from '../models/review.model.js';
import { filterHandler } from '../middleware/filterHandler.js';
import { authProtect } from '../middleware/authProtect.js';
import { roleHandler } from '../middleware/roleHandler.js';

reviewsRouter.route('/').get(filterHandler(Review, 'bootcamp'), getReviews);
reviewsRouter
  .route('/:id')
  .get(getReview)
  .put(authProtect, roleHandler('publisher', 'admin', 'user'), updateReview)
  .delete(authProtect, roleHandler('publisher', 'admin', 'user'), deleteReview);

export { reviewsRouter };
