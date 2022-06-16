/**
 * 비밀번호를 암호화 하는 함수
 */

import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export default (password) => {
  return crypto.createHmac('sha1', process.env.SECRET).update(password).digest('base64');
};
