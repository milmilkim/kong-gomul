import { db, sequelize } from '../../models/index.js';
import { Op, Sequelize } from 'sequelize';
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
        [sequelize.literal(avg), 'avg_count'],
        [sequelize.literal(count), 'avg_rating'],
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

export const getBook = async (req, res) => {
  const { id } = req.params;

  //쿠키에 최근 조회한 책 아이디 추가
  if (req.cookies.book_id) {
    //쿠키가 있음
    let book_id = req.cookies.book_id.split('+');

    if (book_id.indexOf(id) === -1) {
      //중복이 아님
      book_id.unshift(id);
      if (book_id.length > 20) {
        //20개 초과
        book_id.pop();
      }
      res.cookie('book_id', book_id.join('+'), { maxAge: 604800000 }); //7d
    }
  } else {
    //쿠키 없음
    res.cookie('book_id', id, { maxAge: 604800000 }); //7d
  }
  const bookInfo = await book.findOne({
    subQuery: false,
    where: { id },
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
        model: review,
        as: 'reviews',
        separate: true,
        offset: 0,
        limit: 5,
        attributes: ['id', 'rating', 'contents', 'is_spoiler'],
        order: [['id', 'DESC']],
        include: [
          {
            model: member,
            as: 'member',
            attributes: ['nickname', 'id', 'profile_image'],
          },
        ],
      },
      {
        model: wish,
        as: 'wishes',
        attributes: [[sequelize.fn('COUNT', Sequelize.col('wishes.id')), 'count_wish']],
      },
    ],
    group: ['id'],
  });

  res.send({ book_info: bookInfo });
};

/**
 * GET
 * api/book/review/:id
 * */

export const getBookReview = async (req, res) => {
  const bookId = req.params.id;
  const page = req.params.page || 1;
  const size = req.params.size || 10;
  const sort = req.params.sort || 'id';

  try {
    const reviews = await review.findAll({
      limit: size,
      offset: (page - 1) * size,
      order: [[sort, 'desc']],
      where: {
        book_id: bookId,
      },
      include: [
        {
          model: member,
          as: 'member',
          attributes: ['nickname', 'id', 'profile_image'],
        },
      ],
    });

    res.send(reviews);
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
