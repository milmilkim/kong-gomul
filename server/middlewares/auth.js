/**
 * jwt 유효성을 검사하는 미들웨어
 * 검사가 완료되면 유저 정보를 디코딩함
 */

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: '토큰이 없습니다',
    });
  }

  try {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) throw new Error('유효하지 않은 토큰입니다');
      req.decoded = decoded;
      req.token = token;
      next();
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export default authMiddleware;
