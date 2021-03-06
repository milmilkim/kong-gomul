import { db, sequelize } from '../../models/index.js';
import { Op, Sequelize } from 'sequelize';
import getPalette from '../../lib/getPalette.js';

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

  //????????? ?????? ????????? ??? ????????? ??????
  if (req.cookies.book_id) {
    //????????? ??????
    let book_id = req.cookies.book_id.split('+');

    if (book_id.indexOf(id)) {
      //????????????
      book_id = book_id.filter((v) => v !== book_id); //?????? ??? ??????
    }
    book_id.unshift(id);
    if (book_id.length > 20) {
      //20??? ??????
      book_id.pop();
    }
    res.cookie('book_id', book_id.join('+'), { maxAge: 604800000 }); //7d
  } else {
    //?????? ??????
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
        model: wish,
        as: 'wishes',
        attributes: [[sequelize.fn('COUNT', Sequelize.col('wishes.id')), 'count_wish']],
      },
    ],
    group: ['id'],
  });

  const colors = await getPalette(bookInfo.dataValues.thumbnail);

  res.send({ book_info: bookInfo, colors });
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
    const reviews = await review.findAll({
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

    res.send(reviews);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

/*?????? ??? ????????? ??????*/
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
    res.json({ msg: '???????????? ???????????????..' });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = res.params;
  await book.destroy({ where: { id: id } });

  res.send({ msg: 'ok' });
};
