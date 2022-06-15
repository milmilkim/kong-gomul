/**
 * 카테고리 페이지
 */
import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

/* Components */
import BooksItem from "../../components/BooksItem";
import Spinner from "../../components/spinner";

/* Styled Components */
const CategoryContainer = styled.div`
  width: 1200px;
  margin: 0 auto;

  .bookItemContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .bookItemTitle {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
  }
`;

const CategoryItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Category = memo(() => {
  const [comicBookData, setcomicBookData] = useState(null);
  const [romanceBookData, setRomanceBookData] = useState(null);
  const [fantasyBookData, setFantasyBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getBookList = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/book", {
        params: {
          category: "만화 e북",
        },
      });
      const res2 = await axios.get("http://localhost:3001/api/book", {
        params: {
          category: "로판 e북",
        },
      });
      const res3 = await axios.get("http://localhost:3001/api/book", {
        params: {
          category: "판타지 웹소설",
        },
      });

      setcomicBookData(res.data);
      setRomanceBookData(res2.data);
      setFantasyBookData(res3.data);
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

      <CategoryContainer>
        {/* 좋아요 수가 가장 많은 작품을 표시 */}
        <CategoryItemList>
          {/* comic */}
          {comicBookData &&
            comicBookData
              .map((book, index) => (
                <div className="bookItemContainer">
                  <BooksItem book={book} itemWidth="100%" />
                  <h4 className="bookItemTitle">코믹</h4>
                </div>
              ))
              .slice(0, 1)}

          {/* romance */}
          {romanceBookData &&
            romanceBookData
              .map((book, index) => (
                <div className="bookItemContainer" key={index}>
                  <BooksItem book={book} itemWidth="100%" itemHref="/category/genres" />
                  <h4 className="bookItemTitle">로맨스</h4>
                </div>
              ))
              .slice(0, 1)}

          {/* fantasy */}
          {fantasyBookData &&
            fantasyBookData
              .map((book, index) => (
                <div className="bookItemContainer" key={index}>
                  <BooksItem book={book} itemWidth="100%" />
                  <h4 className="bookItemTitle">판타지</h4>
                </div>
              ))
              .slice(0, 1)}
        </CategoryItemList>
      </CategoryContainer>
    </>
  );
});

export default Category;
