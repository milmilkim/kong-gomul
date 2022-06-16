import express from 'express';
import { join, login, check, loginWithKakao } from './auth.ctrl.js';
import authMiddleware from '../../middlewares/auth.js';

const router = express.Router();

/* 라우팅 */
router.get('/', (res, req) => {
  req.json('auth');
});

router.post('/join', join);

router.post('/login', login);

router.get('/loginWithKakao', loginWithKakao);

router.use('/check', authMiddleware); //토큰 검증 미들웨어 등록
router.get('/check', check);

export default router;
