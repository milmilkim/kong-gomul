import { db } from '../../models/index.js';
const { Book, Author, Genre, Keyword, Publisher } = db;

/* 예외 처리 추가해야 됨... */

export const getBookList = async (req, res) => {
  console.log('리스트');
  const book = await Book.findAll({
    include: [
      {
        model: Author,
        attributes: ['name'],
      },
      {
        model: Publisher,
        attributes: ['name'],
      },
      {
        model: Keyword,
        attributes: ['keyword'],
      },
      {
        model: Genre,
        attributes: ['genre'],
      },
    ],
    order: [
      ['id', 'ASC'],
      [Author, 'id', 'ASC'],
    ],
  });
  res.send(book);
};

export const getBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findOne({
    where: { id: id },
    include: [
      {
        model: Author,
        attributes: ['name'],
      },
      {
        model: Publisher,
        attributes: ['name'],
      },
      {
        model: Keyword,
        attributes: ['keyword'],
      },
      {
        model: Genre,
        attributes: ['genre'],
      },
    ],
    order: [[Author, 'id', 'ASC']],
  });

  res.send(book);
};

const data = {
  ridi_url: 'https://ridibooks.com/books/371002616?_rdt_sid=category_books&_rdt_idx=1',
  isbn: '9788954684989',
  title: '여학교의 별',
  thumbnail: 'https://img.ridicdn.net/cover/371002678/xxlarge#1',
  published_date: '2022-02-15',
  genre: '만화 e북',
  introduce:
    '<여학교의 별> 『빠졌어, 너에게』 와야마 야마의 첫 장편만화\n2021년 [이 만화가 대단해!] 여성편 1위, 2022년 5위 연속 선정\n일본 누계 100만 부(2022년 1월 기준) 돌파\n\n“저 싫어하시죠? 폐만 끼치고, 늘 틱틱 대고.\n하지만… 그건 진짜 제가 아니에요.”\n\n또 한번 모두를 빠지게 할, 충격적으로 귀여운 선생님의 등장\n\n학급일지에 펼쳐진 의문의 그림 끝말잇기와 불쑥 교실에 나타난 강아지. 당황스러운 상상력을 가진 만화가 지망생 학생과 동료 교사와의 시시콜콜한 회식까지. 어느 여학교 2학년 4반 담임 호시 선생님의 조금 엉뚱하고 제법 사랑스러운 일상 이야기.',
  isAdult: false,
  Authors: [{ name: '와야마 야마' }, { name: '현승희' }],
  Genres: [{ genre: '드라마' }],
  Publisher: [{ name: '문학동네' }],
  Keyword: [{ keyword: '코믹' }],
};

export const addBook = async (res, req) => {
  const book = await Book.create(data, {
    include: [
      {
        model: Author,
        as: 'Authors',
      },
      {
        model: Publisher,
        as: 'Publishers',
      },
      {
        model: Keyword,
        as: 'Keywords',
      },
      {
        model: Genre,
        as: 'Genres',
      },
    ],
  });

  req.send(book);
};

export const deleteBook = async (res, req) => {
  const { id } = res.params;
  await Book.destroy({ where: { id: id } });

  req.send({ msg: 'ok' });
};
