/**
 * 내 서재 별점순 페이지
 */
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

/* Slice */
import { getLibrary } from "../../slices/LibrarySlice";
import { getMyProfile } from "../../slices/MemberSlice";

/* Components */
import BooksItem from "../../components/BooksItem";
import ItemList from "../../components/ItemList";
import LibraryNav from "../../components/LibraryNav";
import StyledButton from "../../components/StyledButton";
import Spinner from "../../components/spinner";
import ResultNotFound from "../../components/ResultNotFound";

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
  const { loading } = useSelector((state) => state.review); // 로딩여부
  const ratingArr = [0, ...Array(10)].map((v, i) => i).reverse(); // 0~10까지 배열

  const [memberId, setMemberId] = useState(); // 멤버 아이디
  const [reviewList, setReviewList] = useState(); // 유저가 작성한 리뷰 목록들

  useEffect(() => {
    async function fetchData() {
      const {
        payload: {
          data: { id },
        },
      } = await dispatch(getMyProfile()); // 멤버 아이디를 가져온다.
      setMemberId(id);

      const {
        payload: { data: reviewData },
      } = await dispatch(
        getLibrary({
          member_id: memberId,
        })
      ); // 가져온 멤버 아이디와 일치하는 회원이 작성한 리뷰 목록을 가져온다.
      setReviewList(reviewData);
    }

    fetchData();
  }, [dispatch, memberId]);

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

export default LibraryRatings;
