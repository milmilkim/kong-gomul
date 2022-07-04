import { db } from '../../models/index.js';
import encrypt from '../../lib/encrypt.js';
import { generateRefreshToken, generateToken } from '../../lib/jwt.js';

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
  try {
    existingMember = await member.findOne({
      where: {
        user_id: newMember.user_id,
      },
    });

    if (existingMember !== null) {
      throw new Error('이미 존재하는 아이디입니다');
    }
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
    로컬 로그인
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

    if (
      existingMember === null ||
      existingMember.platform !== 'local' ||
      existingMember.password !== encrypt(password)
    ) {
      throw new Error('아이디와 비밀번호를 확인하세요');
    } else {
      //jwt 토큰 발급
      const accessToken = await generateToken(existingMember);
      const refreshToken = await generateRefreshToken(existingMember);
      await member.update({ refresh_token: refreshToken }, { where: { user_id } });

      res.json({
        success: true,
        accessToken,
        refreshToken,
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
    GET /api/auth/refresh
    리프레쉬 토큰으로 새 토큰 발급해준다
*/

export const checkRefresh = async (req, res) => {
  const { id } = req.decoded;

  try {
    let existingMember = null;
    existingMember = await member.findOne({ where: { id } });

    if (existingMember !== null && existingMember.refresh_token === req.token) {
      const accessToken = await generateToken(existingMember);

      res.send({ success: true, accessToken });
    } else {
      throw new Error('유효하지 않은 토큰입니다');
    }
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
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

    let accessToken;
    let refreshToken;

    if (existingMember === null) {
      const newMember = await member.create({
        user_id: kakaoUser.id,
        nickname: kakaoUser.properties.nickname,
        profile_image: kakaoUser.properties.profile_image,
        email: kakaoUser.kakao_account.email || null,
        platform: 'kakao',
      });

      accessToken = await generateToken(newMember);
      refreshToken = await generateRefreshToken(newMember);
    } else {
      accessToken = await generateToken(existingMember);
      refreshToken = await generateRefreshToken(existingMember);
    }

    await member.update({ refresh_token: refreshToken }, { where: { user_id: kakaoUser.id } });

    res.json({
      success: true,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(401).json({ success: false, message: '유효하지 않은 토큰입니다' });
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

    let accessToken = null;
    let refreshToken = null;

    if (existingMember === null) {
      //유저가 존재하지 않으면
      const newMember = await member.create({
        user_id: googleUser.id,
        nickname: googleUser.name,
        profile_image: googleUser.picture || null,
        email: googleUser.email || null,
        platform: 'google',
      });

      accessToken = await generateToken(newMember);
      refreshToken = await generateRefreshToken(newMember);
    } else {
      accessToken = await generateToken(existingMember);
      refreshToken = await generateRefreshToken(existingMember);
    }

    res.json({
      success: true,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(403).json({
      message: err.message,
    });
  }
};
