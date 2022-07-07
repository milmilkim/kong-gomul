/**
 * 내 서재 별점순 페이지
 */
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

/* Slice */
import { getReviewList } from "../../slices/ReviewSlice";

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
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.review); // 검색결과, 로딩여부
  const ratingArr = [0, ...Array(10)].map((v, i) => i).reverse(); // 0~10까지 배열

  useEffect(() => {
    dispatch(
      getReviewList({
        member_id: 18, // <--------
      })
    );
  }, [dispatch]);

  return (
    <>
      {/* Spinner */}
      <Spinner visible={loading} />

      <LibraryRatingsContainer>
        <LibraryNav />

        {ratingArr.map((rating, index) => {
          const filteredRatingArr =
            data &&
            data
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
                {data && filteredRatingArr.length === 0 ? (
                  <div>평가한 작품이 없습니다.</div> /* 평점이 없을 경우 */
                ) : (
                  data &&
                  filteredRatingArr.map((book, index) => (
                    <BooksItem book={book.book} key={index} />
                  )) /* 평점이 있을 경우 */
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

export default LibraryRatings;
