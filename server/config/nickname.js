const first = [
  '호전적인',
  '서성거리는',
  '열정적인',
  '지나가던',
  '숨겨진',
  '귀여운',
  '배고픈',
  '희미한',
  '부지런한',
  '행복한',
];
const secend = ['도깨비', '아보카도', '바지', '리즈', '마카롱', '노트북', '케이크', '고양이', '모자', '개발자'];

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const createNickname = () => {
  const nickname = first[rand(0, first.length - 1)] + ' ' + secend[rand(0, secend.length - 1)];
  console.log(nickname);
  return nickname;
};
