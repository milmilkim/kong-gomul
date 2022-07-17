/**
 * 평균별점을 인자로 전달하면 코멘트를 리턴
 */

import { comment } from '../config/comment.js';
const generateComment = (avg) => {
  console.log(avg);
  if (avg === null) {
    return comment[0];
  } else if (avg < 1.9) {
    return comment[1];
  } else if (avg < 2.3) {
    return comment[2];
  } else if (avg < 2.5) {
    return comment[3];
  } else if (avg < 2.9) {
    return comment[4];
  } else if (avg < 3.1) {
    return comment[5];
  } else if (avg < 3.3) {
    return comment[6];
  } else if (avg < 3.4) {
    return comment[7];
  } else if (avg < 3.6) {
    return comment[8];
  } else if (avg < 3.7) {
    return comment[9];
  } else if (avg < 3.8) {
    return comment[10];
  } else if (avg < 3.9) {
    return comment[11];
  } else if (avg < 4.0) {
    return comment[12];
  } else if (avg < 4.4) {
    return comment[13];
  } else if (avg < 4.7) {
    return comment[14];
  } else if (avg <= 5.0) {
    return comment[15];
  }
};

export default generateComment;
