import express from 'express';
import authMiddleware from '../../middlewares/auth.js';
import { deleteMember } from './member.ctrl.js';

const member = express.Router();

member.use('/', authMiddleware);
member.delete('/', deleteMember);

export default member;
