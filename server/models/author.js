import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class author extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        book_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'book',
            key: 'id',
          },
        },
        name: {
          type: DataTypes.STRING(30),
          allowNull: true,
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
          {
            name: 'book_id',
            using: 'BTREE',
            fields: [{ name: 'book_id' }],
          },
        ],
      }
    );
  }
}
