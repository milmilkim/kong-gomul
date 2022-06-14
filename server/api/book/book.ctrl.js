import { db } from '../../models/index.js';
const { Book, Author, Genre, Keyword, Publisher } = db;

/* 예외 처리 추가해야 됨... */

export const getBookList = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const category = req.query.category || '만화 e북';

  console.log(req.query);

  const book = await Book.findAll({
    offset: (page - 1) * size,
    limit: size,
    where: {
      category: category,
    },
    include: [
      {
        model: Author,
        as: 'authors',
        attributes: ['name'],
      },
      {
        model: Publisher,
        as: 'publishers',
        attributes: ['name'],
      },
      {
        model: Keyword,
        as: 'keywords',
        attributes: ['keyword'],
      },
      {
        model: Genre,
        as: 'genres',
        attributes: ['genre'],
      },
    ],
    order: [
      ['id', 'ASC'],
      ['authors', 'id', 'ASC'],
    ],
  });
  res.send(book);
};

export const getBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findOne({
    where: { id: id },
    include: [
      {
        model: Author,
        attributes: ['name'],
      },
      {
        model: Publisher,
        attributes: ['name'],
      },
      {
        model: Keyword,
        attributes: ['keyword'],
      },
      {
        model: Genre,
        attributes: ['genre'],
      },
    ],
    order: [[Author, 'id', 'ASC']],
  });

  res.send(book);
};

/*여러 책 한번에 추가*/
export const addBook = async (res, req) => {
  const data = req.body || null;
  if (data !== null) {
    const book = await Book.bulkCreate(data, {
      include: [
        {
          model: Author,
          as: 'authors',
        },
        {
          model: Publisher,
          as: 'publishers',
        },
        {
          model: Keyword,
          as: 'keywords',
        },
        {
          model: Genre,
          as: 'genres',
        },
      ],
    });

    req.send(book);
  } else {
    req.json({ msg: '아무일도 없었습니다..' });
  }
};

export const deleteBook = async (res, req) => {
  const { id } = res.params;
  await Book.destroy({ where: { id: id } });

  req.send({ msg: 'ok' });
};
