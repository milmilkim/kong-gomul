/**
 * 프로필 공개 여부를 확인하는 미들웨어
 */

import { db } from '../models/index.js';
const { member } = db;

const checkPublic = async (req, res) => {
  const { id } = req.params.id;

  try {
    const { is_public: isPublic } = await member.findOne({ id });
    if (!isPublic) {
      throw new Error('서재가 비공개로 설정되어 있습니다');
    }
    next();
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};
export default checkPublic;
