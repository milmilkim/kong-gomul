/**
 * 책 검색결과 페이지
 */
import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";

/* Components */
import BooksItem from "../../components/BooksItem";
import ItemList from "../../components/ItemList";
import Spinner from "../../components/spinner";

/* Custom Hooks */
import { useQueryString } from "../../hooks/useQueryString";

/* Styled Components */
const SearchBooksContainer = styled.div`
  width: 1200px;
  margin: 0 auto;

  .searchBooksTitle {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 2rem;
    margin-bottom: 1rem;
  }
`;

const SearchBooks = memo(() => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Search 페이지에서 입력한 input 값
  const qs = useQueryString();
  const title = qs.title;

  const getBookList = async () => {
    try {
      /**
      // Search 페이지에서 입력한 input 값으로 데이터 요청
      // 미구현, 커밋 안하고 테스트만 해봄
      const res = await axios.get(`http://localhost:3001/api/book/${title}`);
      /*/
      const res = await axios.get(`http://localhost:3001/api/book/`);
      /**/

      setData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      // ajax 로딩 종료
      setIsLoading(false);
    }
  };

  // 페이지가 열렸을 때,
  useEffect(() => {
    // 로딩 시작을 하고
    setIsLoading(true);

    // axios 요청을 한다.
    getBookList();
  }, []);

  return (
    <>
      {/* Spinner */}
      <Spinner visible={isLoading} />

      <SearchBooksContainer>
        <h5 className="searchBooksTitle">검색결과</h5>
        <hr />

        <ItemList>
          {data &&
            data.map((book, index) => (
              <BooksItem book={book} key={index} className="searchBooksItem">
                <div className="booksItemTitle">{book.title}</div>
                <span>{book.authors?.map((author) => author + " ")}</span>
                <span>{book.publishers?.map((publisher) => publisher + " ")}</span>
                <span>{book.genre}</span>
              </BooksItem>
            ))}
        </ItemList>
      </SearchBooksContainer>
    </>
  );
});

export default SearchBooks;
