import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class member extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: 'user_id',
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        nickname: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: true,
          unique: 'email',
        },
        introduce: {
          type: DataTypes.STRING(240),
          allowNull: true,
        },
        birth_year: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        gender: {
          type: DataTypes.CHAR(1),
          allowNull: true,
        },
        platform: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        profile_image: {
          type: DataTypes.STRING(2083),
          allowNull: true,
        },
        refresh_token: {
          type: DataTypes.STRING(1000),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'member',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'user_id',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'user_id' }],
          },
          {
            name: 'email',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'email' }],
          },
        ],
      }
    );
  }
}
