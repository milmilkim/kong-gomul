/**
 * jwt 발급하는 함수
 * @param {any} payload
 * @returns {string} token
 * */

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (member) => {
  const { id, user_id, nickname, profile_image, platform } = member;
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id,
        user_id,
        nickname,
        profile_image,
        platform,
      },
      process.env.SECRET,
      {
        expiresIn: '1h',
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

const generateRefreshToken = (member) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: member.id,
      },
      process.env.SECRET,
      {
        expiresIn: '7d',
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

export { generateToken, generateRefreshToken };
