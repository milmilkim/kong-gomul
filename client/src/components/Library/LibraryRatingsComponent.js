/**
 * 내 서재 별점순 페이지 컴포넌트
 */
import React, { memo } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

/* Components */
import BooksItem from "../BooksItem";
import ItemList from "../ItemList";
import LibraryNav from "./LibraryNav";
import StyledButton from "../StyledButton";
import Spinner from "../spinner";
import ResultNotFound from "../ResultNotFound";

/* Styled Components */
const LibraryRatingsContainer = styled.div`
  width: 1200px;
  margin: 0 auto;

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

const LibraryRatingsComponent = memo(({ memberId, loading, reviewList }) => {
  const ratingArr = [0, ...Array(10)].map((v, i) => i).reverse(); // 0~10까지 배열

  return !memberId ? (
    <ResultNotFound>로그인 상태가 아닙니다.</ResultNotFound>
  ) : (
    <>
      {/* Spinner */}
      <Spinner visible={loading} />

      <LibraryRatingsContainer>
        <LibraryNav />

        {ratingArr.map((rating, index) => {
          const filteredRatingArr =
            reviewList &&
            reviewList
              .filter((book) => book.rating === rating / 2) /* 평점에 따라 분류 */
              .slice(0, 5); /* 5개만 표시한다. */

          return (
            <div key={index}>
              <div className="ratingsTitleContainer">
                <h5 className="ratingsTitle">{rating / 2}점</h5>
                <NavLink to={String(rating / 2)}>
                  <StyledButton>더보기</StyledButton>
                </NavLink>
              </div>

              {/* Book List */}
              <ItemList>
                {reviewList && filteredRatingArr.length === 0 ? (
                  <div>평가한 작품이 없습니다.</div> /* 평점이 없을 경우 */
                ) : (
                  reviewList &&
                  filteredRatingArr.map((book, index) => <BooksItem book={book} key={index} />) /* 평점이 있을 경우 */
                )}
              </ItemList>
              <hr />
            </div>
          );
        })}

        <Outlet />
      </LibraryRatingsContainer>
    </>
  );
});

export default LibraryRatingsComponent;
