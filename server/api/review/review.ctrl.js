import { Op } from 'sequelize';
import { db } from '../../models/index.js';

const { review, member, book } = db;

/**
 *  모든 리뷰 가져오기
 *  GET /api/review?order=''&size=''&page=''
 */
export const getReviewList = async (req, res) => {
  try {
    const size = parseInt(req.query.size) || 10; // 한 페이지당 보여줄 리뷰 수
    const page = parseInt(req.query.page) || 1; // 페이지 수
    const order = req.query.order || 'rating';
    const rating = req.query.rating;
    let result = null;

    if (rating) {
      result = await review.findAll({
        include: [
          {
            model: member,
            as: 'member',
            where: {
              id: req.query.member_id,
            },
          },
          {
            model: book,
            as: 'book',
          },
        ],
        order: [[order, 'DESC']], // 별점순, 최신순 정렬
        limit: size,
        offset: size * (page - 1),
        where: {
          rating: req.query.rating,
        },
      });
    } else {
      result = await review.findAll({
        include: [
          {
            model: member,
            as: 'member',
            where: {
              id: req.query.member_id,
            },
          },
          {
            model: book,
            as: 'book',
          },
        ],
        order: [[order, 'DESC']], // 별점순, 최신순 정렬
        limit: size,
        offset: size * (page - 1),
      });
    }

    res.send(result);
  } catch (err) {
    console.error(err);
  }
};

/**
 * 리뷰 가져오기
 * GET /api/review/:id
 */
export const getReview = async (req, res) => {
  try {
    const result = await review.findAll({
      where: { id: req.params.id },
    });

    res.send(result);
  } catch (err) {
    console.error(err);
  }
};

/**
 * 리뷰 추가하기
 * POST /api/review/:book_id
 */
export const addReview = async (req, res) => {
  try {
    const result = await review.upsert({
      book_id: req.params.book_id,
      member_id: req.body.member_id,
      contents: req.body.contents,
      rating: req.body.rating,
      is_spoiler: req.body.is_spoiler,
    });

    res.send(result);
  } catch (err) {
    console.error(err);
  }
};

/**
 * 리뷰수정
 * PATCH /api/review/:id
 */
export const patchReview = async (req, res) => {
  try {
    const result = await review.update(
      {
        contents: req.body.contents, // 리뷰 내용
        rating: req.body.rating, // 별점
        is_spoiler: req.body.is_spoiler, // 스포일러 여부
      },
      {
        where: { id: req.params.id },
      }
    );

    res.send(result);
  } catch (err) {
    console.error(err);
  }
};
