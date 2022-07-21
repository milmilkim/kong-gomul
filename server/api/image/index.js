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
  const { id } = req.query;
  try {
    const result = await member.update(
      {
        profile_image: 'http://localhost:3001/' + req.file.filename,
      },
      //배포할 때는 외부 저장소 경로로 수정해야 함!
      { where: { id } }
    );
    res.send(result);
  } catch (err) {
    console.error(err);
  }
});

export default router;
