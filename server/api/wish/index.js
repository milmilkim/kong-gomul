import express from 'express';
import { getWishList, addWishList, deleteWishList } from './wish.ctrl.js';
import authMiddleware from '../../middlewares/auth.js';

const wish = express.Router();

wish.use('/', authMiddleware);
wish.get('/', getWishList); // '보고싶어요' 등록한 책 목록
wish.post('/', addWishList); // '보고싶어요' 추가
wish.delete('/', deleteWishList); //'보고싶어요' 삭제

export default wish;
