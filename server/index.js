import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import { sequelize } from './models/index.js';

import api from './api/index.js';

const app = express();

dotenv.config();

app.use(cors());
app.set('port', process.env.PORT || 3001);

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// sequelize
//   .sync({ force: false }) //true면 서버 실행마다 테이블 재생성
//   .then(() => {
//     console.log('데이터베이스 연결 성공');
//   })
//   .catch((err) => {
//     console.error(err);
//   });

app.get('/', (req, res) => {
  res.json('hello world!');
});

app.use('/api', api);

app.use((req, res, next) => {
  res.status(404).json('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
