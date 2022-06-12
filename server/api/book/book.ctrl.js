import { db } from '../../models/index.js';
const { book, author } = db;

/* api 로직 */

const getBookList = async (req, res) => {
  const books = await book.findAll({
    include: [
      {
        model: author,
      },
    ],
    order: [[author, 'id', 'ASC']],
  });
  res.send(books);
};

export { getBookList };
