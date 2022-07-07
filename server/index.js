import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { sequelize } from './models/index.js';

import api from './api/index.js';
import BadRequestException from './lib/BadRequestException.js';

const app = express();

dotenv.config();

const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
); //cors 설정을 한다..

app.set('port', process.env.PORT || 3001);

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
// sequelize
//   .sync({ force: false }) //true면 서버 실행마다 테이블 재생성
//   .then(() => {
//     console.log('데이터베이스 연결 성공');
//   })
//   .catch((err) => {
//     console.error(err);
//   });

app.get('/', (req, res) => {
  res.json('hello world');
});

app.use('/api', api);

app.use((err, req, res, next) => {
  //에러 처리

  if (err instanceof BadRequestException) {
    res.status(400);
    res.json({ message: err.message });
  } else {
    res.status(500).json(err.message);
  }
});

app.use((req, res, next) => {
  res.status(404).json('Not Found');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
