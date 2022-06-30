import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { db } from '../../models/index.js';

const router = express.Router();
const { member } = db;

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더생성');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
    limits: { fileSize: 10 * 1024 * 1024 },
  }),
});

router.post('/upload', upload.single('img'), async (req, res) => {
  try {
    const result = await member.upsert({
      profile_image: req.file.filename,
      where: {
        id: req.body.id,
      },
    });
    res.send(result);
  } catch (err) {
    console.error(err);
  }
});

export default router;
