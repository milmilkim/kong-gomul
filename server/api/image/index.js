import express from 'express';

import dotenv from 'dotenv';
import { db } from '../../models/index.js';
import authMiddleware from '../../middlewares/auth.js';

import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

dotenv.config();
const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_ACCESS_SECRET,
  },
});

const router = express.Router();
const { member } = db;

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'kong-storage',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  limits: { fileSize: 1 * 1024 * 1024 },
});

router.use('/upload', authMiddleware);
router.post('/upload', upload.single('img'), async (req, res, next) => {
  const { id } = req.decoded;
  try {
    if (!id) {
      throw new Error('아이디가 없습니다');
    }
    const result = await member.update(
      {
        profile_image: req.file.location,
      },
      //배포할 때는 외부 저장소 경로로 수정해야 함!
      { where: { id } }
    );
    res.send(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
