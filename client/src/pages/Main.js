import React, { memo } from "react";
import books from "../assets/json/book.json";

import styled from "styled-components";

const MainContainer = styled.main`
  padding: 0;
`;

const Main = memo(() => {
  return (
    <MainContainer>
      {/* 데이터베이스에서 5개를 읽어와서 list 출력해야 함 */}

      <div className="inner">
        {books.map((book, index) => (
          <ul key={index}>
            <a href={book.ridiUrl}>
              <li>{book.title}</li>
              <li>{book.authors.join(", ")}</li>
              <li>
                <img width="100" src={book.thumbnail} alt={book.title} />
              </li>
              <li>{book.categories.join(", ")}</li>
            </a>
          </ul>
        ))}
      </div>
    </MainContainer>
  );
});

export default Main;
