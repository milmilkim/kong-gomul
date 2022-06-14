import { db } from '../../models/index.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const { member } = db;

/*
    POST /api/auth/join
    {
        user_id,
        password,
        email,
        nickname,
        birth_year,
        gender
    }
*/
export const join = async (req, res) => {
  const newMember = req.body;

  let existingMember = null;
  existingMember = await member.findOne({
    where: {
      user_id: newMember.user_id,
    },
  });

  if (existingMember !== null) {
    res.status(403).json({
      message: 'check the user info',
    });
  }

  try {
    await member.create({
      ...newMember,
      password: crypto.createHmac('sha1', process.env.SECRET).update(newMember.password).digest('base64'),
    });
    res.json({
      message: 'ok',
    });
  } catch (err) {
    res.status(403).json({
      message: err.message,
    });
  }
};

/*
    POST /api/auth/login
    {
        user_id,
        password,
    }
*/

export const login = async (req, res) => {
  const { user_id, password } = req.body;

  try {
    let existingMember = null;
    existingMember = await member.findOne({ where: { user_id } });

    if (existingMember === null || existingMember.password !== crypto.createHmac('sha1', process.env.SECRET).update(password).digest('base64')) {
      throw new Error('login failed');
    } else {
      //jwt 토큰 발급
      const accessToken = await new Promise((resolve, reject) => {
        jwt.sign(
          {
            id: existingMember.id,
            email: existingMember.email,
            nickname: existingMember.nickname,
            introduce: existingMember.introduce,
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
      res.json({
        success: true,
        accessToken,
      });
    }
  } catch (err) {
    res.status(403).json({
      message: err.message,
    });
  }
};

export const check = async (req, res) => {
  res.json({
    success: true,
    info: req.decoded,
  });
};
