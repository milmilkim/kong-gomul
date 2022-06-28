import express from 'express';
import authMiddleware from '../../middlewares/auth.js';
import { deleteMember, getMember } from './member.ctrl.js';

const member = express.Router();

member.get('/:id', getMember);

member.use('/', authMiddleware);
member.delete('/', deleteMember);

export default member;
