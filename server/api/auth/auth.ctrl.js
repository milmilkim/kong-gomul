import { db } from '../../models/index.js';
import { Op } from 'sequelize';
import encrypt from '../../lib/encrypt.js';
import { generateRefreshToken, generateToken } from '../../lib/jwt.js';

import regexHelper from '../../lib/RegexHelper.js';
import { sendEmailCode } from '../../lib/sendMail.js';

import dotenv from 'dotenv';
import axios from 'axios';

import { createNickname } from '../../config/nickname.js';

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
export const join = async (req, res, next) => {
  const newMember = req.body;

  //유효성 검사
  const { user_id, password, password_check, email, birth_year, gender, code, code_check, personal } = newMember;
  try {
    regexHelper.value(user_id, 'id를 입력하세요');
    regexHelper.id(user_id, '아이디는 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)로만 입력할 수 있습니다');
    regexHelper.value(email, '이메일을 입력하세요');
    regexHelper.email(email, '이메일 형식이 잘못되었습니다');
    regexHelper.compareTo(code, code_check, '이메일 인증번호가 일치하지 않습니다.');
    regexHelper.value(password, '비밀번호를 입력하세요');
    regexHelper.password(password, '비밀번호는 8자 이상 16자 이하, 문자, 특수문자, 숫자를 포함해야 합니다');
    regexHelper.value(password_check, '비밀번호 확인을 입력하세요');
    regexHelper.password(password_check, '비밀번호 확인은 8자 이상 16자 이하, 문자, 특수문자, 숫자를 포함해야 합니다');
    regexHelper.compareTo(password, password_check, '비밀번호가 일치하지 않습니다.');
    regexHelper.value(personal, '필수항목을 체크해주세요.');

    //선택 입력
    birth_year && regexHelper.value(birth_year, '출생년도를 입력해주세요.');
    birth_year && regexHelper.minLength(birth_year, 4, '출생년도 4자리를 입력해주세요.');
    birth_year && regexHelper.maxLength(birth_year, 4, '출생년도 4자리를 입력해주세요.');
    gender && regexHelper.gender(gender, '성별을 확인하세요');

    let existingMember = null;
    existingMember = await member.findOne({
      where: {
        [Op.or]: [{ user_id: newMember.user_id }, { email: newMember.email }],
      },
    });

    if (existingMember !== null) {
      throw new Error('이미 존재하는 아이디입니다');
    }
    newMember.nickname = createNickname(); //랜덤 닉네임 생성해서 newMember 객체에 추가
    const _member = await member.create({
      ...newMember,
      password: encrypt(newMember.password),
      platform: 'local',
    });
    res.json({
      message: 'ok',
      member: _member,
    });
  } catch (err) {
    next(err);
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
  const { id } = req.decoded;

  let info = null;
  try {
    info = await member.findOne({ where: { id } });
  } catch (err) {
    next(err);
  }
  res.json({
    success: true,
    info,
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
      throw new Error('유효하지 않은 토큰입니다(2 )');
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
    } = await axios.get('https://kauth.kakao.com/oauth/token', {
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: process.env.KAKAO_REDIRECT_URI + '?platform=kakao',
        code: code,
      },
    }); //액세스 토큰을 받아온다

    const { data: kakaoUser } = await axios.get('https://kapi.kakao.com/v2/user/me', {
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

    await member.update({ refresh_token: refreshToken }, { where: { user_id: String(kakaoUser.id) } });

    res.json({
      success: true,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
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

    await member.update({ refresh_token: refreshToken }, { where: { user_id: String(googleUser.id) } });

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

/*
    GET /api/auth/email
*/
export const getEmailCode = async (req, res, next) => {
  const { email } = req.query;

  try {
    regexHelper.value(email, '이메일을 입력하세요');
    regexHelper.email(email, '잘못된 이메일 주소입니다');

    //랜덤 문자열 코드를 만든다
    const newCode = Math.random().toString(36).slice(2);

    //메일 보냄
    await sendEmailCode(email, newCode);

    res.send({ result: 'ok', email_code: newCode });
  } catch (err) {
    next(err);
  }
};
