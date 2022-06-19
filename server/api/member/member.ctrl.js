import { db, sequelize } from '../../models/index.js';
import qs from 'qs';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { member } = db;

export const deleteMember = async (req, res) => {
  const { id } = req.decoded;

  try {
    const deleteMember = await member.destroy({
      where: {
        id,
      },
    });
    //db에서 계정 삭제

    const { platform } = deleteMember;

    if (platform === 'kakao') {
      const data = { target_id_type: 'user_id', target_id: 'id' };

      await axios({
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
        },
        data: qs.stringify(data),
        url: 'https://kapi.kakao.com/v1/user/unlink',
      });
    }

    res.send({
      success: true,
      member: deleteMember,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
