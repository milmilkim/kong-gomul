import _sequelize from 'sequelize';
const DataTypes = _sequelize.DataTypes;
import _author from './author.js';
import _book from './book.js';
import _genre from './genre.js';
import _keyword from './keyword.js';
import _publisher from './publisher.js';

export default function initModels(sequelize) {
  const author = _author.init(sequelize, DataTypes);
  const book = _book.init(sequelize, DataTypes);
  const genre = _genre.init(sequelize, DataTypes);
  const keyword = _keyword.init(sequelize, DataTypes);
  const publisher = _publisher.init(sequelize, DataTypes);

  author.belongsTo(book, { as: 'book', foreignKey: 'book_id' });
  book.hasMany(author, { as: 'authors', foreignKey: 'book_id' });
  genre.belongsTo(book, { as: 'book', foreignKey: 'book_id' });
  book.hasMany(genre, { as: 'genres', foreignKey: 'book_id' });
  keyword.belongsTo(book, { as: 'book', foreignKey: 'book_id' });
  book.hasMany(keyword, { as: 'keywords', foreignKey: 'book_id' });
  publisher.belongsTo(book, { as: 'book', foreignKey: 'book_id' });
  book.hasMany(publisher, { as: 'publishers', foreignKey: 'book_id' });

  return {
    author,
    book,
    genre,
    keyword,
    publisher,
  };
}
