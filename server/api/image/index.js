import express from 'express';

import dotenv from 'dotenv';
import { db } from '../../models/index.js';
import authMiddleware from '../../middlewares/auth.js';
import uploadImage from '../../middlewares/uploadImage.js';

import s3 from '../../config/s3.js';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';

dotenv.config();

const router = express.Router();
const { member } = db;

router.use('/upload', authMiddleware);
router.post('/upload', uploadImage.single('img'), async (req, res, next) => {
  //이미지 업로드함
  const { id } = req.decoded;
  try {
    if (!id) {
      throw new Error('아이디가 없습니다');
    }

    const { profile_image: prevImg } = await member.findOne({
      where: { id },
      raw: true,
      attributes: ['profile_image'],
    });

    if (prevImg && prevImg.includes(process.env.S3_BUCKET_NAME)) {
      const url = prevImg.split('/');
      const delFileName = url[url.length - 1];

      const deleteObjectsCommand = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: delFileName,
      });

      await s3.send(deleteObjectsCommand);
    }

    await member.update(
      {
        profile_image: req.file.location,
      },
      { where: { id } }
    );
    res.send(req.file.location);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
