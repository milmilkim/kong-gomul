import Sequelize from 'sequelize';
import Book from './book.js';
import Author from './author.js';
import config from '../config/config.js';
import Genre from './genre.js';
import Keyword from './keyword.js';
import Publisher from './publisher.js';

const db = {};

//Sequelize 객체를 통해 MySQL연결 객체 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config);

/* db 객체에 담기 */
db.Sequelize = sequelize;
db.Book = Book;
db.Author = Author;
db.Genre = Genre;
db.Keyword = Keyword;
db.Publisher = Publisher;

/* 각 모델의 static.init 메서드 호출 */
Book.init(sequelize);
Author.init(sequelize);
Genre.init(sequelize);
Keyword.init(sequelize);
Publisher.init(sequelize);

/* 다른 테이블과의 관계 연결 */

Book.associate(db);
Author.associate(db);
Genre.associate(db);
Keyword.associate(db);
Publisher.associate(db);

export { db, sequelize };
