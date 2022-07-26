import { db, sequelize } from '../models/index.js';
import { Op, Sequelize } from 'sequelize';

const { book, keyword } = db;
const count = `(SELECT COUNT(*) FROM review WHERE book_id = \`book\`.\`id\` AND rating IS NOT NULL)`;
const avg = `(SELECT AVG(rating) FROM review WHERE book_id = \`book\`.\`id\` AND rating IS NOT NULL)`;

class BookService {
  async getListByKeyword(params) {
    let bookList = null;

    bookList = await book.findAll({
      attributes: [
        'title',
        'category',
        'id',
        'thumbnail',
        [sequelize.literal(avg), 'avg_rating'],
        [sequelize.literal(count), 'avg_count'],
      ],
      order: Sequelize.literal('rand()'),
      include: [{ model: keyword, as: 'keywords', attributes: ['keyword'], duplicating: false }],
      where: {
        ['$keywords.keyword$']: params.keyword,
        category: params.category,
      },
      limit: 20,
    });

    return bookList;
  }
}

export default BookService;
