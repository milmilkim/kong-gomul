import express from 'express';
import authMiddleware from '../../middlewares/auth.js';
import { deleteMember, getMember, getMyProfile } from './member.ctrl.js';

const member = express.Router();

member.use('/me', authMiddleware);
member.get('/me', getMyProfile);

member.get('/:id', getMember);

member.use('/', authMiddleware);
member.delete('/', deleteMember);

export default member;
