import express from 'express';
import book from './book/index.js';
import auth from './auth/index.js';
import library from './library/index.js';

const api = express.Router();

api.get('/', (req, res) => {
  res.json('api');
});

api.use('/book', book);
api.use('/auth', auth);
api.use('/library', library);

export default api;
