/**
 * 내 서재 별점순 페이지
 */
import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

/* Components */
import BooksItem from "../../components/BooksItem";
import ItemList from "../../components/ItemList";
import LibraryNav from "../../components/LibraryNav";
import StyledButton from "../../components/StyledButton";
import Spinner from "../../components/spinner";

/* Styled Components */
const LibraryRatingsContainer = styled.div`
  .ratingsTitleContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    .ratingsTitle {
      font-size: 1.2rem;
      font-weight: 700;
      line-height: 2rem;
      margin-bottom: 1rem;
    }
  }
`;

const LibraryRatings = memo(() => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getBookList = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/book");
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

      <LibraryRatingsContainer>
        <LibraryNav />

        {/* 평점 5.0 */}
        <div>
          <div className="ratingsTitleContainer">
            <h5 className="ratingsTitle">5.0</h5>
            <NavLink to="10">
              <StyledButton>더보기</StyledButton>
            </NavLink>
          </div>

          {/* Book List */}
          <ItemList>{data && data.slice(0, 5).map((book, index) => <BooksItem book={book} key={index} />)}</ItemList>
          <hr />
        </div>

        {/* 평점 4.5 */}
        <div>
          <div className="ratingsTitleContainer">
            <h5 className="ratingsTitle">4.5</h5>
            <NavLink to="9">
              <StyledButton>더보기</StyledButton>
            </NavLink>
          </div>

          <ItemList>{data && data.slice(0, 5).map((book, index) => <BooksItem book={book} key={index} />)}</ItemList>
          <hr />
        </div>

        {/* 평점 4.0 */}
        {/* 평점 3.5 */}
        {/* 평점 3.0 */}
        {/* 평점 2.5 */}
        {/* 평점 2.0 */}
        {/* 평점 1.5 */}
        {/* 평점 1.0 */}
        {/* 평점 0.5 */}

        <Outlet />
      </LibraryRatingsContainer>
    </>
  );
});

export default LibraryRatings;
