CREATE TABLE IF NOT EXISTS book (
    id INT NOT NULL AUTO_INCREMENT,
    ridi_url varchar(2083) NOT NULL,
    isbn varchar(13),
    title varchar(30) NOT NULL,
    thumbnail varchar(200) NOT NULL,
    published_date date,
    category varchar(20),
    introduce text,
    is_adult boolean,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS author (
    id INT NOT NULL AUTO_INCREMENT,
    book_id INT NOT NULL,
    name varchar(30),
    PRIMARY KEY(id),
    FOREIGN KEY(book_id) REFERENCES book(id) ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TABLE IF NOT EXISTS publisher (
    id INT NOT NULL AUTO_INCREMENT,
    book_id INT NOT NULL,
    name varchar(30) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(book_id) REFERENCES book(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS keyword (
    id INT NOT NULL AUTO_INCREMENT,
    book_id INT NOT NULL,
    keyword varchar(20) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(book_id) REFERENCES book(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS genre (
    id INT NOT NULL AUTO_INCREMENT,
    book_id INT NOT NULL,
    genre varchar(20) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(book_id) REFERENCES book(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO book(ridi_url, isbn, title, thumbnail, published_date, category, introduce, is_adult)
VALUES (
    'https://ridibooks.com/books/371002672?_rdt_sid=category_books&_rdt_idx=0',
    '9788954686303',
    '가라오케 가자!',
    'https://img.ridicdn.net/cover/371002672/xxlarge#1',
    '2022-05-16',
    '만화 e북',
    "<가라오케 가자!> 『빠졌어, 너에게』 『여학교의 별』 와야마 야마의 초기 걸작\n2021년 [이 만화가 대단하다!] 여성편 5위,\n전설을 낳은 와야마 야마 유니버스의 시작!\n\n야쿠자 쿄지는 ‘문신’이라는 끔찍한 벌칙이 걸린 두목님 배 노래 대회에서 살아남기 위해 인근 중학교의 합창부 부장 사토미를 찾아간다. 슬럼프로 우울에 빠져 있던 사토미는 다짜고짜 찾아와 노래 선생님이 되어달라는 야쿠자 아저씨가 귀찮기만 하다. 하지만 쿄지와 있으면 슬럼프도 조금 잊히는 듯한데… 목숨을 건 노래 대회. 중학생 X 야쿠자, 두 남자의 설레는 의기투합!",
    false
);

INSERT INTO author(book_id, name)
VALUES (
    1,
    '와야마 야마'
);

INSERT INTO author(book_id, name)
VALUES (
    1,
    '현승희'
);

INSERT INTO publisher(book_id, name)
VALUES (
    1,
    '문학동네'
);

INSERT INTO keyword(book_id, keyword)
VALUES (
    1,
    '완결'
);

INSERT INTO keyword(book_id, keyword)
VALUES (
    1,
    '코믹물'
);

INSERT INTO keyword(book_id, keyword)
VALUES (
    1,
    '학원물'
);

INSERT INTO genre(book_id, genre)
VALUES (
    1,
    '드라마'
);

INSERT INTO genre(book_id, genre)
VALUES (
    1,
    '코믹'
);

CREATE TABLE IF NOT EXISTS member (
    id INT NOT NULL AUTO_INCREMENT,
    user_id varchar(20) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    nickname varchar(20) NOT NULL,
    email varchar(20) NOT NULL UNIQUE,
    introduce varchar(240),
    birth_year year(4),
    gender char(1),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS review (
    id INT NOT NULL AUTO_INCREMENT,
    book_id int NOT NULL,
    member_id int NOT NULL,
    rating float NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(book_id) REFERENCES book(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(member_id) REFERENCES member(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS comment (
    id INT NOT NULL AUTO_INCREMENT,
    book_id int NOT NULL,
    member_id int NOT NULL,
    contents text,
    PRIMARY KEY(id),
    FOREIGN KEY(book_id) REFERENCES book(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(member_id) REFERENCES member(id) ON DELETE CASCADE ON UPDATE CASCADE
);

alter table review add unique (book_id, member_id);
alter table comment add unique (book_id, member_id);


INSERT INTO member(user_id, password, nickname, email, introduce, birth_year, gender)
values (
    'hello',
    'password',
    '지나가는리즈',
    'aa@ab.com',
    '가는중',
    '1997',
    'F'
);

INSERT INTO review(book_id, member_id, rating)
VALUES (
    1,
    1,
    5.0
);

INSERT INTO comment(book_id, member_id, contents)
VALUES(
    1,
    1,
    '정말 재미있네요...'
)



