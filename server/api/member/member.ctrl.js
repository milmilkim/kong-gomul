import { db } from '../../models/index.js';
import qs from 'qs';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { member } = db;

/*
    탈퇴
    DELETE /api/member
*/

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

/*
    남의 프로필 조회
    get /api/member/:id
*/
export const getMember = async (req, res) => {
  const { id } = req.params;
  let profile = null;

  try {
    if (!id) {
      throw new Error('아이디가 없습니다');
    }
    profile = await member.findOne({
      where: { id },
      attributes: ['nickname', 'introduce', 'profile_image', 'is_public'],
    });

    if (profile === null) {
      throw new Error('존재하지 않는 아이디입니다');
    }
    res.send(profile);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

/*
    내 프로필 조회
    get /api/member/me
*/

export const getMyProfile = async (req, res) => {
  const { id } = req.decoded;

  try {
    const profile = await member.findOne({
      where: { id },
      attributes: {
        exclude: ['password', 'refresh_token'],
      },
    });
    if (profile === null) {
      throw new Error('id가 존재하지 않습니다');
    }
    res.send(profile);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  next();
};
