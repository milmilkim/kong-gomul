import dotenv from 'dotenv';

dotenv.config();

const config = {
  username: process.env.JAWSDB_USERNAME,
  password: process.env.JAWSDB_PASSWORD,
  database: process.env.JAWSDB_DATABASE,
  host: process.env.JAWSDB_HOST,
  dialect: 'mysql',
  define: {
    timestamps: false,
    underscored: true,
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default config;
