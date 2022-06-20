import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _author from  "./author.js";
import _book from  "./book.js";
import _genre from  "./genre.js";
import _keyword from  "./keyword.js";
import _member from  "./member.js";
import _publisher from  "./publisher.js";
import _review from  "./review.js";
import _wish from  "./wish.js";

export default function initModels(sequelize) {
  const author = _author.init(sequelize, DataTypes);
  const book = _book.init(sequelize, DataTypes);
  const genre = _genre.init(sequelize, DataTypes);
  const keyword = _keyword.init(sequelize, DataTypes);
  const member = _member.init(sequelize, DataTypes);
  const publisher = _publisher.init(sequelize, DataTypes);
  const review = _review.init(sequelize, DataTypes);
  const wish = _wish.init(sequelize, DataTypes);

  author.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(author, { as: "authors", foreignKey: "book_id"});
  genre.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(genre, { as: "genres", foreignKey: "book_id"});
  keyword.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(keyword, { as: "keywords", foreignKey: "book_id"});
  publisher.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(publisher, { as: "publishers", foreignKey: "book_id"});
  review.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(review, { as: "reviews", foreignKey: "book_id"});
  wish.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(wish, { as: "wishes", foreignKey: "book_id"});
  review.belongsTo(member, { as: "member", foreignKey: "member_id"});
  member.hasMany(review, { as: "reviews", foreignKey: "member_id"});
  wish.belongsTo(member, { as: "member", foreignKey: "member_id"});
  member.hasMany(wish, { as: "wishes", foreignKey: "member_id"});

  return {
    author,
    book,
    genre,
    keyword,
    member,
    publisher,
    review,
    wish,
  };
}
