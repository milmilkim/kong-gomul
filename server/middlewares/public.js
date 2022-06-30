/**
 * 프로필 공개 여부를 확인하는 미들웨어
 */

import { db } from '../models/index.js';
const { member } = db;

const checkPublic = async (req, res, next) => {
  const { id } = req.params;
  let _member = null;

  try {
    _member = await member.findOne({ where: { id } });

    if (_member === null) {
      throw new Error('존재하지 않는 사용자입니다');
    } else if (_member.is_public === false) {
      throw new Error('비공개 상태입니다');
    } else {
      next();
    }
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};
export default checkPublic;
