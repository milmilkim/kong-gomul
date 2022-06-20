import { db, sequelize } from '../../models/index.js';

const { book, author, genre, keyword, publisher, review, member } = db;

export const getBookList = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const category = req.query.category || '만화 e북';
  const avg = sequelize.fn('AVG', sequelize.col('reviews.rating'));

  const books = await book.findAll({
    subQuery: false,
    offset: (page - 1) * size,
    limit: size,
    where: {
      category: category,
    },
    attributes: {
      include: [[avg, 'rating_avg']],
      group: 'reviews.book_id',
    },
    include: [
      {
        model: author,
        as: 'authors',
        attributes: ['name'],
      },
      {
        model: publisher,
        as: 'publishers',
        attributes: ['name'],
      },
      {
        model: keyword,
        as: 'keywords',
        attributes: ['keyword'],
      },
      {
        model: genre,
        as: 'genres',
        attributes: ['genre'],
      },
      {
        model: review,
        attributes: [],
        as: 'reviews',
        group: 'id',
      },
    ],
    order: [
      ['id', 'ASC'],
      ['authors', 'id', 'ASC'],
    ],
    group: ['id'],
  });
  res.send(books);
};

export const getBook = async (req, res) => {
  const { id } = req.params;

  const ratings = await review.findAll({
    where: {
      book_id: id,
    },
    attributes: [
      [sequelize.fn('AVG', sequelize.col('rating')), 'rating_avg'],
      [sequelize.fn('COUNT', sequelize.col('rating')), 'rating_count'],
    ],
  });

  const _book = await book.findOne({
    where: { id: id },
    include: [
      {
        model: author,
        as: 'authors',
        attributes: ['name'],
      },
      {
        model: publisher,
        as: 'publishers',
        attributes: ['name'],
      },
      {
        model: keyword,
        as: 'keywords',
        attributes: ['keyword'],
      },
      {
        model: genre,
        as: 'genres',
        attributes: ['genre'],
      },
      {
        model: review,
        as: 'reviews',
        offset: 0,
        limit: 5,
        attributes: ['id', 'rating', 'contents', 'is_spoiler'],
        include: [
          {
            model: member,
            as: 'member',
            attributes: ['nickname', 'id', 'profile_image'],
          },
        ],
      },
    ],
    order: [['authors', 'id', 'ASC']],
  });

  res.send({ book: _book, ratings: ratings });
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
