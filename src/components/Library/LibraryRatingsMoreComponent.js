/**
 * 내 서재 별점순 더보기 페이지 컴포넌트
 */
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";

/* Components */
import BooksItem from "../BooksItem";
import StyledButton from "../StyledButton";
import ItemList from "../ItemList";
import Spinner from "../spinner";
import ResultNotFound from "../ResultNotFound";

/* Styled Components */
const LibraryRatingsMoreComponentContainer = styled.div`
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

const LibraryRatingsMoreComponent = memo(({ memberId, loading, reviewList, ratingTitle }) => {
  /* 뒤로가기 */
  const navigate = useNavigate();

  return !memberId ? (
    <ResultNotFound>로그인 상태가 아닙니다.</ResultNotFound>
  ) : (
    <>
      {/* Spinner */}
      <Spinner visible={loading} />

      <LibraryRatingsMoreComponentContainer>
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
            reviewList && reviewList.map((book, index) => <BooksItem book={book} key={index} />) /* 평점이 있을 경우 */
          )}
        </ItemList>
      </LibraryRatingsMoreComponentContainer>
    </>
  );
});

export default LibraryRatingsMoreComponent;
