import express from 'express';
import { getSearchResult } from './search.ctrl.js';

const router = express.Router();

router.get('/', getSearchResult);

export default router;