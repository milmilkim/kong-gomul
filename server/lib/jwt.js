/**
 * jwt 발급하는 함수
 * @param {any} payload
 * @returns {string} token
 * */

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (existingMember) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: existingMember.id,
        user_id: existingMember.user_id,
        nickname: existingMember.nickname,
        profile_image: existingMember.profile_image,
      },
      process.env.SECRET,
      {
        expiresIn: '1d',
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

export { generateToken };
