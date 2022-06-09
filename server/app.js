const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

app.use(cors());
app.set('port', process.env.PORT || 3001);

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
