import express from 'express';
import { join, login, check, loginWithKakao, loginWithGoogle, checkRefresh, getEmailCode } from './auth.ctrl.js';
import authMiddleware from '../../middlewares/auth.js';

const router = express.Router();

/* 라우팅 */
router.get('/', (res, req) => {
  req.json('auth');
});

router.post('/join', join);
router.post('/login', login);
router.get('/kakao', loginWithKakao);
router.get('/google', loginWithGoogle);

router.use('/check', authMiddleware); //토큰 검증 미들웨어 등록
router.get('/check', check);

router.use('/refresh', authMiddleware);
router.get('/refresh', checkRefresh);

router.get('/email', getEmailCode);

export default router;
