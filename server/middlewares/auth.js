import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: '토큰이 없습니다',
    });
  }

  try {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) throw new Error('유효하지 않은 토큰입니다');
      req.decoded = decoded;
      next();
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};

export default authMiddleware;
