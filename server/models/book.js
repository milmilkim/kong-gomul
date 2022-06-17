import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class book extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ridi_url: {
      type: DataTypes.STRING(2083),
      allowNull: false
    },
    isbn: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    thumbnail: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    published_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    introduce: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_adult: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'book',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
