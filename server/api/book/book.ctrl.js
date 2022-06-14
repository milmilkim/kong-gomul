import { db } from '../../models/index.js';
const { book, author, genre, keyword, publisher } = db;

/* 예외 처리 추가해야 됨... */

export const getBookList = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const category = req.query.category || '만화 e북';

  console.log(req.query);

  const books = await book.findAll({
    offset: (page - 1) * size,
    limit: size,
    where: {
      category: category,
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
    ],
    order: [
      ['id', 'ASC'],
      ['authors', 'id', 'ASC'],
    ],
  });
  res.send(books);
};

export const getBook = async (req, res) => {
  const { id } = req.params;
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
    ],
    order: [['authors', 'id', 'ASC']],
  });

  res.send(_book);
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
