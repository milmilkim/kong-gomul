import express from 'express';
import { getBookList, getBook, addBook, deleteBook, getBookReview } from './book.ctrl.js';
const router = express.Router();

/* 라우팅 */
router.get('/', getBookList);
router.get('/:id', getBook);
router.post('/', addBook);
router.delete('/:id', deleteBook);
router.get('/review/:id', getBookReview);

export default router;
