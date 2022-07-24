import dotenv from 'dotenv';
dotenv.config();

const s3 = {
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_ACESS_SECRET,
  region: 'ap-northeast-2',
};

export default s3;
