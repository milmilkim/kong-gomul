import { db, sequelize } from '../models/index.js';
import { Op, Sequelize } from 'sequelize';

const { review, book } = db;

class CFService {
  async getReviewList(params) {
    const reviewList = await review.findAll({
      where: params,
      attributes: ['member_id', 'book_id', 'rating'],
      raw: true,
    });

    return reviewList;
  }

  /**
   * 추천 책 아이디와 점수와 예상별점 불러옴
   */
  async getRecoList(id) {
    //특정 회원의 리뷰를 모두 불러온다
    const myReview = await this.getReviewList({
      member_id: id,
    });

    // 평가한 책이 하나도 없으면 null
    if (myReview.length === 0) {
      return null;
    }

    //책 기준으로 별점 정리 (별점이 null이 아닌 것만)
    const myRating = {};
    myReview.forEach((v) => {
      if (v.rating) myRating[v.book_id] = v.rating;
    });

    //이미 평가해서 추천에서 제외할 책
    const ratedBook = myReview.map((v) => v.book_id);

    //별점을 준 책들의 아이디와 일치하는 다른 사람들의 리뷰를 모두 불러온다
    const similarReview = await this.getReviewList({
      book_id: {
        [Op.in]: Object.keys(myRating),
      },
      member_id: {
        [Op.ne]: id,
      },
      rating: {
        [Op.ne]: null,
      },
    });

    //취향 겹치는 사람이 한명도 없으면 null 리턴
    if (similarReview.length === 0) {
      return null;
    }

    //같은 책 기준으로 멤버 아이디와 별점
    const similarBook = {};
    similarReview.forEach((v, i) => {
      if (!similarBook[v.book_id]) {
        similarBook[v.book_id] = [];
      }
      similarBook[v.book_id].push({ member_id: v.member_id, rating: v.rating });
    });

    //멤버 기준으로 책 아이디와 별점
    const similarMember = {};
    similarReview.forEach((v, i) => {
      if (!similarMember[v.member_id]) {
        similarMember[v.member_id] = [];
      }
      similarMember[v.member_id].push({ book_id: v.book_id, rating: v.rating });
    });

    //취향 비슷한 멤버와 점수 저장할 배열
    const memberScore = {};

    //멤버별로 점수 구한다
    for (let book_id in similarBook) {
      similarBook[book_id].forEach((v) => {
        if (!memberScore[v.member_id]) memberScore[v.member_id] = {};
        if (!memberScore[v.member_id]['score']) memberScore[v.member_id]['score'] = 0;

        memberScore[v.member_id]['score'] += v.rating * myRating[book_id];
      });
    }

    //점수 순으로 정렬
    const relatedMember = [];
    for (let member_id in memberScore) {
      relatedMember.push({ member_id, score: memberScore[member_id]['score'] });
    }
    relatedMember.sort((a, b) => b.score - a.score);

    //relatedMember의 아이디와 member_id가 일치
    //ratedBook의 book_id는 제외
    //예상 별점이 3점 이상인

    const relatedBook = await this.getReviewList({
      member_id: {
        [Op.in]: relatedMember.map((v) => v.member_id),
      },
      book_id: {
        [Op.notIn]: ratedBook,
      },
      rating: {
        [Op.gte]: 3,
      },
    });

    //아무것도 없으면 null
    if (relatedBook.length === 0) {
      return null;
    }

    const playlist = {};
    let playlistCount = 0;

    //책별로 점수 더함
    relatedBook.forEach((v) => {
      if (!playlist[v.book_id]) {
        playlist[v.book_id] = {};
      }
      if (!playlist[v.book_id]['member_score']) {
        playlist[v.book_id]['member_score'] = 0;
        playlist[v.book_id]['sum_rating'] = 0;
        playlist[v.book_id]['count_rating'] = 0;
      }
      playlist[v.book_id]['member_score'] += memberScore[v.member_id]['score'];
      playlist[v.book_id]['sum_rating'] += v.rating;
      playlist[v.book_id]['count_rating'] += 1;
    });

    const result = [];

    //점수순으로 정렬
    for (let book_id in playlist) {
      const score = playlist[book_id]['member_score'];
      const expected_rating = playlist[book_id]['sum_rating'] / playlist[book_id]['count_rating'];
      result.push({ book_id, score, expected_rating });
    }

    result.sort((a, b) => b.score - a.score);

    return result;
  }

  /**
   * 추천 책 정보 불러옴
   */
  async getRecoBook(id) {
    const recoList = await this.getRecoList(id);

    if (!recoList) {
      return [];
    }

    const bookList = await book.findAll({
      where: {
        id: {
          [Op.in]: recoList.map((v) => v.book_id),
        },
      },
      limit: 40,
      attributes: ['id', 'title', 'thumbnail'],
      raw: true,
    });

    const recoBookBase = {};
    recoList.forEach((v) => {
      if (!recoBookBase[v.book_id]) {
        recoBookBase[v.book_id] = {};
      }
      recoBookBase[v.book_id]['score'] = v.score;
      recoBookBase[v.book_id]['expected_rating'] = v.expected_rating;
    });

    const result = [];
    bookList.forEach((v, i) => {
      result[i] = v;
      result[i]['score'] = recoBookBase[v.id]['score'];
      result[i]['expected_rating'] = recoBookBase[v.id]['expected_rating'];
    });

    //정렬
    result.sort((a, b) => b.expected_rating - a.expected_rating).sort((a, b) => b.score - a.score);
    return result;
  }
}

export default CFService;
