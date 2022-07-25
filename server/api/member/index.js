import express from 'express';
import authMiddleware from '../../middlewares/auth.js';
import {
  deleteMember,
  getMember,
  getMyProfile,
  updateMember,
  analysis,
  getMyId,
  getMyPassword,
} from './member.ctrl.js';

const member = express.Router();

member.get('/userid', getMyId);
member.get('/password', getMyPassword);

member.use('/me', authMiddleware);
member.get('/me', getMyProfile);
member.get('/me/analysis', analysis);

member.get('/:id', getMember);
member.get('/:id/analysis', analysis);

member.use('/:id', authMiddleware);
member.patch('/:id', updateMember);

member.use('/', authMiddleware);
member.delete('/', deleteMember);

export default member;