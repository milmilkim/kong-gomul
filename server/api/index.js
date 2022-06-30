import express from 'express';
import book from './book/index.js';
import auth from './auth/index.js';
import library from './library/index.js';
import member from './member/index.js';
import review from './review/index.js';
import search from './search/index.js';

const api = express.Router();

api.get('/', (req, res) => {
  res.json('api');
});

api.use('/book', book);

api.use('/auth', auth);

api.use('/library', library);

api.use('/member', member);

api.use('/review', review);

api.use('/search', search);

export default api;
