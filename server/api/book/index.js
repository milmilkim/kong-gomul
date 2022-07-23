import express from 'express';
import { getBookList, getBook, addBook, deleteBook, getBookReview, getRecommendations } from './book.ctrl.js';
import authMiddleware from '../../middlewares/auth.js';
const router = express.Router();

/* 라우팅 */

router.use('/recommendations', authMiddleware);
router.get('/recommendations', getRecommendations);

router.get('/', getBookList);

router.get('/:id', getBook);

router.post('/', addBook);

router.delete('/:id', deleteBook);

router.get('/review/:id', getBookReview);

export default router;
