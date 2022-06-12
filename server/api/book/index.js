import express from 'express';
import { getBookList } from './book.ctrl.js';
const router = express.Router();

/* 라우팅 */
router.get('/book', getBookList);

export default router;
