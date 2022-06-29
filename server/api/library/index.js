import express from 'express';
import authMiddleware from '../../middlewares/auth.js';
import { getLibrary } from './library.ctrl.js';
import checkPublic from '../../middlewares/public.js';

const library = express.Router();

library.get('/', (req, res) => {
  res.json('library');
});

library.use('/me', authMiddleware);
library.get('/me', getLibrary);

library.use('/:id', checkPublic);
library.get('/:id', getLibrary);

export default library;
