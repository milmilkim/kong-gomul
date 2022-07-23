import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const writerName = '콩고물';
const writerEmail = process.env.KONG_GOMUL_EMAIL;
const googleAppPassword = process.env.GOOGLE_APP_PASSWORD;

const smtp = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: writerEmail,
    pass: googleAppPassword,
  },
});

export const sendId = async (receiverEmail, id) => {
  const mailInfo = {
    from: writerName + ' <' + writerEmail + '>',
    to: receiverEmail,
    subject: '[콩고물] 아이디 찾기',
    html: `<h1>아이디를 보내드립니다</h1><p>${id}</p>`,
  };

  await smtp.sendMail(mailInfo);
};

export const sendPassword = async (receiverEmail, password) => {
  const mailInfo = {
    from: writerName + ' <' + writerEmail + '>',
    to: receiverEmail,
    subject: '[콩고물] 비밀번호 재설정',
    html: `<h1>임시 비밀번호가 발급되었습니다</h1><p>임시비밀번호: ${password}<br />로그인 후 비밀번호를 변경하세요</p>`,
  };

  await smtp.sendMail(mailInfo);
};

console.log(Math.random().toString(36).slice(2));
