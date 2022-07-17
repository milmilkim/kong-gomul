import express from 'express';
import { getReviewList, getReview, addReview, patchReview } from './review.ctrl.js';
import authMiddleware from '../../middlewares/auth.js';

const router = express.Router();

router.get('/', getReviewList);
router.get('/:id', getReview);

router.use('/', authMiddleware);
router.post('/:book_id', addReview);
router.patch('/:id', patchReview);

export default router;
