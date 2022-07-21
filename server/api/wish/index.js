import express from 'express';
import { getWishList, addWishList, deleteWishList } from './wish.ctrl.js';
import authMiddleware from '../../middlewares/auth.js';
import checkPublic from '../../middlewares/public.js';

const wish = express.Router();

// '보고싶어요' 등록한 책 목록
wish.use('/:id', checkPublic);
wish.get('/:id', getWishList);

wish.use('/', authMiddleware);
wish.get('/', getWishList);

//보고싶어요 추가
wish.post('/', addWishList);

//'보고싶어요' 삭제
wish.delete('/:book_id', deleteWishList);

export default wish;
