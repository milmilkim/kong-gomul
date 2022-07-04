import express from 'express';
import { getAutoSearchResult, getSearchResult } from './search.ctrl.js';

const router = express.Router();

router.get('/', getAutoSearchResult);
router.get('/books', getSearchResult);
router.get('/users', getSearchResult);

export default router;
