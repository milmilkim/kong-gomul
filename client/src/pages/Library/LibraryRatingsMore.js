/**
 * 내 서재 별점순 더보기 페이지
 */
import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";

/* Slice */
import { getReviewList } from "../../slices/ReviewSlice";
import { getMyProfile } from "../../slices/MemberSlice";

/* Components */
import BooksItem from "../../components/BooksItem";
import StyledButton from "../../components/StyledButton";
import ItemList from "../../components/ItemList";
import Spinner from "../../components/spinner";

/* Styled Components */
const LibraryRatingsMoreContainer = styled.div`
  width: 1200px;
  margin: 0 auto;

  .btnContainer {
    display: flex;
    margin-bottom: 1rem;
  }

  .ratingsMoreTitle {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 2rem;
    margin-bottom: 1rem;
  }
`;

const LibraryRatingsMore = memo(() => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.review); // 검색결과, 로딩여부

  const [memberId, setMemberId] = useState(); // 멤버 아이디
  const [reviewList, setReviewList] = useState(); // 유저가 작성한 리뷰 목록들

  /* 파라미터로 전달받은 rating을 가져온다. */
  const { rating } = useParams();
  const ratingTitle = parseFloat(rating);

  /* 뒤로가기 */
  const navigate = useNavigate();

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
        getReviewList({
          member_id: memberId,
          rating: parseFloat(rating),
        })
      ); // 가져온 멤버 아이디와 일치하는 회원이 작성한 리뷰 목록을 가져온다.
      setReviewList(reviewData);
    }

    fetchData();
  }, [dispatch, memberId, rating]);

  return (
    <>
      {/* Spinner */}
      <Spinner visible={loading} />

      <LibraryRatingsMoreContainer>
        <div className="btnContainer" onClick={() => navigate(-1)}>
          <StyledButton>
            <FaArrowLeft>뒤로가기</FaArrowLeft>
          </StyledButton>
        </div>

        <h5 className="ratingsMoreTitle">{ratingTitle}점을 준 도서</h5>
        <hr />

        {/* Book List */}
        <ItemList>
          {reviewList && reviewList.length === 0 ? (
            <div>평가한 작품이 없습니다.</div> /* 평점이 없을 경우 */
          ) : (
            reviewList &&
            reviewList.map((book, index) => <BooksItem book={book.book} key={index} />) /* 평점이 있을 경우 */
          )}
        </ItemList>
      </LibraryRatingsMoreContainer>
    </>
  );
});

export default LibraryRatingsMore;
