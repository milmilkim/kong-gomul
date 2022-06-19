import React from "react";
import styled from "styled-components";

import BooksThumb from "../../components/BooksThumb";

const BookInfoContainer = styled.div`
  padding: 0;
  text-align: center;

  button {
    margin: 15px auto 0;
    display: block;
    width: 80px;
    height: 30px;
    appearance: none;
    outline: none;
    border: none;
    background-color: #333;
    color: #eee;
  }
`;

const BookInfo = () => {
  return (
    <BookInfoContainer>
      <div className="inner">
        <section className="flex-row">
          <div>
            <BooksThumb
              size={"big"}
              category={"카테고리명 테스트"}
              title={"타이틀 테스트"}
              author={"저자 테스트"}
              publisher={"출판사 테스트"}
            />
            <button>보고싶어요</button>
          </div>
          <div></div>
        </section>
      </div>
    </BookInfoContainer>
  );
};

export default BookInfo;
