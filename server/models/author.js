import Sequelize from 'sequelize';

class Author extends Sequelize.Model {
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
        book_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'book',
            key: 'id',
          },
        },
        name: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'author',
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
    db.author.belongsTo(db.book, { foreignKey: 'book_id' });
  }
}

export default Author;
