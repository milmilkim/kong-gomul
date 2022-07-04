import { db, sequelize } from '../../models/index.js';

const { book, author, genre, keyword, publisher, review, member } = db;

const avg = `(SELECT COUNT(*) FROM review WHERE book_id = \`book\`.\`id\`)`;
const count = `(SELECT AVG(rating) FROM review WHERE book_id = \`book\`.\`id\`)`;

export const getBookList = async (req, res) => {
  const where = {};
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;

  const { category, id, sort } = req.query;

  category && (where.category = category);
  id && (where.id = id.split('+'));

  let order;

  if (sort === 'rating') {
    order = sequelize.literal(`avg_rating desc`);
  } else if (sort === 'count') {
    order = sequelize.literal(`avg_count desc`);
  } else {
    order = [['id', 'ASC']];
  }

  const books = await book.findAll({
    subQuery: false,
    offset: (page - 1) * size,
    limit: size,
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
      },
      {
        model: publisher,
        as: 'publishers',
        attributes: ['name'],
      },
      // {
      //   model: keyword,
      //   as: 'keywords',
      //   attributes: ['keyword'],
      // },
      // {
      //   model: genre,
      //   as: 'genres',
      //   attributes: ['genre'],
      // },
    ],
    order: [order, ['authors', 'id', 'ASC']],
  });
  res.send(books);
};

export const getBook = async (req, res) => {
  const { id } = req.params;

  const bookInfo = await book.findOne({
    where: { id },
    attributes: {
      include: [
        [sequelize.literal(avg), 'avg_count'],
        [sequelize.literal(count), 'avg_rating'],
      ],
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

  res.send({ book_info: bookInfo });
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
