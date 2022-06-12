import express from 'express';
import book from './book/index.js';

const api = express.Router();

api.get('/', (req, res) => {
  res.json('api');
});

api.get('/book', book);

export default api;
