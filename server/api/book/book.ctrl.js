import { db, sequelize } from '../../models/index.js';
import { Op, Sequelize } from 'sequelize';
import getPalette from '../../lib/getPalette.js';
import BookService from '../../services/BookService.js';

//추천 알고리즘
import CFService from '../../services/CF.js';

const { book, author, genre, keyword, publisher, review, member, wish } = db;

const count = `(SELECT COUNT(*) FROM review WHERE book_id = \`book\`.\`id\` AND rating IS NOT NULL)`;
const avg = `(SELECT AVG(rating) FROM review WHERE book_id = \`book\`.\`id\` AND rating IS NOT NULL)`;

export const getBookList = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;

  const { category, id, sort, genre: _genre } = req.query;

  const category_attr = {};

  const where = {
    category: category_attr,
  };

  if (category) {
    category_attr[Op.eq] = category;
  } else {
    category_attr[Op.not] = null;
  }

  if (id) {
    where.id = id.split('+');
  }

  let order;

  if (sort === 'rating') {
    order = sequelize.literal(`avg_rating desc`);
  } else if (sort === 'count') {
    order = sequelize.literal(`avg_count desc`);
  } else if (sort === 'random') {
    order = Sequelize.literal('rand()');
  } else {
    order = [['id', 'ASC']];
  }

  let duplicating = true;
  if (_genre) {
    where['$genres.genre$'] = _genre;
    duplicating = false;
  }

  const books = await book.findAll({
    where,
    attributes: {
      include: [
        [sequelize.literal(avg), 'avg_rating'],
        [sequelize.literal(count), 'avg_count'],
      ],
      exclude: ['introduce', 'isbn', 'published_date'],
    },
    include: [
      {
        model: author,
        as: 'authors',
        attributes: ['name'],
        separate: true,
      },
      {
        model: publisher,
        as: 'publishers',
        attributes: ['name'],
        separate: true,
      },
      // {
      //   model: keyword,
      //   as: 'keywords',
      //   attributes: ['keyword'],
      // },
      {
        model: genre,
        as: 'genres',
        attributes: ['genre'],
        duplicating,
      },
    ],
    order: [order],
    offset: (page - 1) * size,
    limit: size,
  });
  res.send(books);
};

export const getBook = async (req, res, next) => {
  const { id } = req.params;

  try {
    const bookInfo = await book.findOne({
      subQuery: false,
      where: { id },
      raw: false,
      attributes: {
        include: [
          [sequelize.literal(avg), 'avg_rating'],
          [sequelize.literal(count), 'count_rating'],
        ],
      },

      include: [
        {
          model: author,
          as: 'authors',
          attributes: ['name'],
          separate: true,
        },
        {
          model: publisher,
          as: 'publishers',
          attributes: ['name'],
          separate: true,
        },
        {
          model: keyword,
          as: 'keywords',
          attributes: ['keyword'],
          separate: true,
        },
        {
          model: genre,
          as: 'genres',
          attributes: ['genre'],
          separate: true,
        },
        {
          model: wish,
          as: 'wishes',
          attributes: [[sequelize.fn('COUNT', Sequelize.col('wishes.id')), 'count_wish']],
        },
      ],
      group: ['id'],
    });

    if (!bookInfo) {
      throw new Error('책이 존재하지 않습니다');
    }

    //쿠키에 최근 조회한 책 아이디 추가
    if (req.cookies.book_id) {
      //쿠키가 있음
      let book_id = req.cookies.book_id.split('+');

      if (book_id.indexOf(id)) {
        //중복이면
        book_id = book_id.filter((v) => v !== book_id); //있던 거 삭제
      }
      book_id.unshift(id);
      if (book_id.length > 20) {
        //20개 초과
        book_id.pop();
      }
      res.cookie('book_id', book_id.join('+'), { maxAge: 604800000 }); //7d
    } else {
      //쿠키 없음
      res.cookie('book_id', id, { maxAge: 604800000 }); //7d
    }
    const colors = await getPalette(bookInfo.dataValues.thumbnail);
    res.send({ book_info: bookInfo, colors });
  } catch (err) {
    next(err);
  }
};

/**
 * GET
 * api/book/review/:id
 * */

export const getBookReview = async (req, res) => {
  const bookId = req.params.id;
  const memberId = req.query.member_id;
  const page = Number(req.query.page) || 1;
  const size = Number(req.query.size) || 10;
  const sort = req.query.sort || 'id';

  const where = { book_id: bookId };
  if (memberId) {
    where['member_id'] = memberId;
  } else {
    where['contents'] = { [Op.ne]: null };
  }

  try {
    const reviews = await review.findAndCountAll({
      limit: size,
      offset: (page - 1) * size,
      order: [[sort, 'desc']],
      where,
      include: [
        {
          model: member,
          as: 'member',
          attributes: ['nickname', 'id', 'profile_image'],
        },
      ],
    });

    res.set('total-count', reviews.count); //총 갯수
    res.send(reviews.rows);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

/*여러 책 한번에 추가*/
export const addBook = async (req, res) => {
  const data = req.body || null;
  if (data !== null) {
    const books = await book.bulkCreate(data, {
      include: [
        {
          model: author,
          as: 'authors',
        },
        {
          model: publisher,
          as: 'publishers',
        },
        {
          model: keyword,
          as: 'keywords',
        },
        {
          model: genre,
          as: 'genres',
        },
      ],
    });

    res.send(books);
  } else {
    res.json({ msg: '아무일도 없었습니다..' });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = res.params;
  await book.destroy({ where: { id: id } });

  res.send({ msg: 'ok' });
};

/**
 * GET
 * api/book/keyword
 */

export const getSimilarBook = async (req, res, next) => {
  const bookService = new BookService();
  const { keyword, category } = req.query;

  try {
    const bookList = await bookService.getListByKeyword({ keyword, category });
    res.send(bookList);
  } catch (err) {
    next(err);
  }
};

/**
 * GET
 * api/book/recommendations
 */

export const getRecommendations = async (req, res, next) => {
  const id = req.decoded.id || req.query.id;

  const cfService = new CFService();

  let bookList;
  try {
    bookList = await cfService.getRecoBook(id);
  } catch (err) {
    next(err);
  }

  res.json(bookList);
};
