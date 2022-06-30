import { Op } from "sequelize";
import { db } from "../../models/index.js";

const { book, member } = db;

/**
 *  검색 결과 가져오기
 *  GET /api/search?query=''&type=''&size=''&page=''
 */
export const getSearchResult = async (req, res) => {
  let result = null;

  try {
    const size = parseInt(req.query.size) || 5; // 한 페이지당 보여줄 검색결과수, 최대 5개
    const page = parseInt(req.query.page) || 1; // 페이지 수
    const searchType = req.query.type || 'book'; // 책, 유저검색 

    // 책 검색
    if (searchType == "book") {
      result = await book.findAll({
        where: {
          title: {
            [Op.substring]: req.query.query,
          },
        },
        limit: size,
        offset: size * (page - 1),
      });
    } // 유저 검색
    else if(searchType == 'user') {
      result = await member.findAll({
        attributes: ['nickname', 'introduce', 'profile_image'], // 닉네임, 소개, 프로필이미지
        where: {
          nickname: {
            [Op.substring]: req.query.query,
          },
        },
        limit: size,
        offset: size * (page - 1),
      });
    }

    res.send(result);
  } catch (err) {
    console.error(err);
  }
};
