import { db, sequelize } from '../../models/index.js';
import { Op, Sequelize } from 'sequelize';
import qs from 'qs';
import axios from 'axios';
import dotenv from 'dotenv';
import regexHelper from '../../lib/RegexHelper.js';
import encrypt from '../../lib/encrypt.js';
import sortArr from '../../lib/SortArr.js';

import generateComment from '../../lib/generateComment.js';

dotenv.config();

const { member, review, book, keyword, genre } = db;

/**
 * 수정
 * PATCH /api/member/:id
 */

export const updateMember = async (req, res) => {
  const info = req.body;
  const id = parseInt(req.params.id);

  try {
    if (id !== req.decoded.id) {
      throw new Error('아이디가 일치하지 않습니다');
    }

    if (info.hasOwnProperty('nickname')) {
      //닉네임 유효성 검사
      regexHelper.value(info.nickname, '닉네임은 필수값입니다');
      regexHelper.maxLength(info.nickname, 20, '닉네임은 20자까지 입력할 수 있습니다');
    }

    if (info.hasOwnProperty('introduce')) {
      regexHelper.maxLength(info.introduce, 240, '자기소개는 240자 까지만 입력 할 수 있습니다');
    }

    if (info.hasOwnProperty('gender')) {
      //성별 유효성 검사
      regexHelper.gender(info.gender, '성별을 확인하세요');
    }

    if (info.hasOwnProperty('birth_year')) {
      //출생연도 유효성 검사
      regexHelper.birthYear(info.birth_year, '출생연도가 잘못되었습니다');
    }

    if (info.hasOwnProperty('password')) {
      //비밀번호 유효성 검사
      regexHelper.password(info.password, '비밀번호는 8자 이상 16자 이하, 문자, 특수문자, 숫자를 포함해야 합니다');
    }

    if (info.hasOwnProperty('email')) {
      regexHelper.value(info.email, '이메일을 입력하세요');
      regexHelper.email(info.email, '이메일 형식이 잘못되었습니다');
    }

    await member.update(
      {
        ...info,
        password: encrypt(info.password),
      },
      {
        where: {
          id,
        },
      }
    );

    res.send({ result: 'ok' });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

/*
    탈퇴
    DELETE /api/member
*/

export const deleteMember = async (req, res) => {
  const { id, platform, user_id } = req.decoded;

  try {
    await member.destroy({
      where: {
        id,
      },
    });

    if (platform === 'kakao') {
      const data = { target_id_type: 'user_id', target_id: user_id };

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

/* 내 취향분석 결과
    get /api/member/me/analysis
*/
export const analysis = async (req, res, next) => {
  const { id } = req.decoded;

  try {
    let reviewList;
    reviewList = await review.findAll({
      where: {
        member_id: id,
        rating: {
          [Op.ne]: null,
        },
      },
      attributes: ['book_id', 'rating'],
    });

    let ratingSum = 0;
    const ratingList = [];
    const bookId = [];
    reviewList.forEach((review, i) => {
      ratingSum += review.dataValues.rating;
      ratingList.push(review.dataValues.rating);
      bookId.push(review.dataValues.book_id);
    });

    //별점
    const ratingCountAll = reviewList.length; //총 개수
    const ratingCount = ratingSum ? sortArr.getCounts(ratingList) : null;
    const ratingAvg = ratingSum ? Number((ratingSum / ratingCountAll).toFixed(1)) : null; //평균

    //키워드
    const keywordMaxLength = 10; //최대 개수
    const keywordList = await keyword.findAll({ where: { book_id: bookId }, attributes: ['keyword'] });
    const keywordArray = keywordList.map((v, i) => v.dataValues.keyword).filter((v) => v !== '완결' && v !== '일본');
    const sortedKeyword = sortArr.getSortedArr(keywordArray).slice(0, keywordMaxLength);

    //장르
    const GenreMaxLength = 10; //최대 개수
    const genreList = await genre.findAll({ where: { book_id: bookId }, attributes: ['genre'] });
    const genreArray = genreList.map((v, i) => v.dataValues.genre);
    const sortedGenre = sortArr.getSortedArr(genreArray).slice(0, GenreMaxLength);

    //카테고리
    const categoryList = await book.findAll({ where: { id: bookId } });
    const categoryArray = categoryList.map((v, i) => v.dataValues.category);
    const sortedCategory = sortArr.getSortedArr(categoryArray);

    res.send({
      rating: {
        count_all: ratingCountAll,
        avg: ratingAvg,
        count: ratingCount,
        comment: generateComment(ratingAvg),
      },
      keyword: sortedKeyword,
      genre: sortedGenre,
      category: sortedCategory,
    });
  } catch (err) {
    next();
  }
};
