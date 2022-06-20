import express from 'express';
import authMiddleware from '../../middlewares/auth.js';
import { getLibrary } from './library.ctrl.js';

const library = express.Router();

library.get('/', (req, res) => {
  res.json('library');
});

library.use('/me', authMiddleware);
library.get('/me', getLibrary);

library.get('/:id', getLibrary);

export default library;
