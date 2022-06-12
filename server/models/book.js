import Sequelize from 'sequelize';

class Book extends Sequelize.Model {
  /* 테이블에 대한 설정 */
  static init(sequelize) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        ridi_url: {
          type: Sequelize.STRING(2083),
          allowNull: false,
        },
        isbn: {
          type: Sequelize.STRING(13),
          allowNull: true,
        },
        title: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        thumbnail: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        published_date: {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
        category: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        introduce: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        is_adult: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'book',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
        ],
      }
    );
  }
  /* 다른 모델과의 관계 */
  static associate(db) {
    db.book.hasMany(db.author, { foreignKey: 'book_id' });
  }
}

export default Book;
