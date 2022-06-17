import { db } from '../../models/index.js';
import encrypt from '../../lib/encrypt.js';
import { generateToken } from '../../lib/jwt.js';

import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const { member } = db;

/*
    POST /api/auth/join
    {
        user_id,
        password,
        email,
        nickname,
        birth_year,
        gender,
    }
*/
export const join = async (req, res) => {
  const newMember = req.body;

  let existingMember = null;
  existingMember = await member.findOne({
    where: {
      user_id: newMember.user_id,
    },
  });

  if (existingMember !== null) {
    res.status(403).json({
      message: '이미 존재하는 아이디입니다~_~!!',
    });
  }

  try {
    await member.create({
      ...newMember,
      password: encrypt(newMember.password),
      platform: 'local',
    });
    res.json({
      message: 'ok',
    });
  } catch (err) {
    res.status(403).json({
      message: err.message,
    });
  }
};

/*
    POST /api/auth/login
    {
        user_id,
        password,
    }
*/

export const login = async (req, res) => {
  const { user_id, password } = req.body;

  try {
    let existingMember = null;
    existingMember = await member.findOne({ where: { user_id } });

    if (existingMember === null || existingMember.platform !== 'local' || existingMember.password !== encrypt(password)) {
      throw new Error('아이디와 비밀번호를 확인하세요');
    } else {
      //jwt 토큰 발급
      const accessToken = await generateToken(existingMember);
      res.json({
        success: true,
        accessToken,
      });
    }
  } catch (err) {
    res.status(403).json({
      message: err.message,
    });
  }
};

/*
    GET /api/auth/check
    토큰의 유효성을 검사한다
*/
export const check = async (req, res) => {
  res.json({
    success: true,
    info: req.decoded,
  });
};

/*
    GET /api/auth/loginWithKakao?code=${code}
*/
export const loginWithKakao = async (req, res) => {
  const { code } = req.query; //쿼리로 인가코드를 받아옴

  try {
    const {
      data: { access_token: kakaoAccessToken },
    } = await axios('https://kauth.kakao.com/oauth/token', {
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: process.env.KAKAO_REDIRECT_URI + '?platform=kakao',
        code: code,
      },
    }); //액세스 토큰을 받아온다

    const { data: kakaoUser } = await axios('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    }); //유저 정보를 받아온다

    let existingMember = null;
    existingMember = await member.findOne({
      where: {
        user_id: kakaoUser.id,
      },
    });

    if (existingMember === null) {
      const newMember = await member.create({
        user_id: kakaoUser.id,
        nickname: kakaoUser.properties.nickname,
        profile_image: kakaoUser.properties.profile_image,
        email: kakaoUser.kakao_account.email || null,
        platform: 'kakao',
      });

      const accessToken = await generateToken(newMember);
      res.json({
        success: true,
        accessToken,
      });
    } else {
      const accessToken = await generateToken(existingMember);
      res.json({
        success: true,
        accessToken,
      });
    }
  } catch (err) {
    res.status(403).json({
      message: err.message,
    });
  }
};

/*
    GET /api/auth/loginWithGoogle?code=${code}
*/

export const loginWithGoogle = async (req, res) => {
  const { code } = req.query; //쿼리로 인가코드를 받아옴

  try {
    const {
      data: { access_token: googleAccessToken },
    } = await axios.post(
      'https://oauth2.googleapis.com/token',
      {},
      {
        params: {
          grant_type: 'authorization_code',
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: process.env.GOOGLE_REDIRECT_URI + '?platform=google',
          code: code,
        },
      }
    ); //액세스 토큰을 받아온다

    console.log(googleAccessToken);

    const { data: googleUser } = await axios('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    }); //유저 정보를 받아온다

    let existingMember = null;
    existingMember = await member.findOne({
      where: {
        user_id: googleUser.id,
      },
    });

    if (existingMember === null) {
      const newMember = await member.create({
        user_id: googleUser.id,
        nickname: googleUser.name,
        profile_image: googleUser.picture || null,
        email: googleUser.email || null,
        platform: 'google',
      });

      const accessToken = await generateToken(newMember);
      res.json({
        success: true,
        accessToken,
      });
    } else {
      const accessToken = await generateToken(existingMember);
      res.json({
        success: true,
        accessToken,
      });
    }
  } catch (err) {
    res.status(403).json({
      message: err.message,
    });
  }
};
