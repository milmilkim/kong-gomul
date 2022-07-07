/**
 * 내 서재 별점순 더보기 페이지
 */
import React, { memo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";

/* Slice */
import { getReviewList } from "../../slices/ReviewSlice";

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
  const { data, loading } = useSelector((state) => state.review); // 검색결과, 로딩여부

  /* 파라미터로 전달받은 rating을 가져온다. */
  const { rating } = useParams();
  const ratingTitle = parseFloat(rating);

  /* 뒤로가기 */
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getReviewList({
        member_id: 18, // <--------
        rating: parseFloat(rating),
      })
    );
  }, [dispatch, rating]);

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
          {data && data.length === 0 ? (
            <div>평가한 작품이 없습니다.</div> /* 평점이 없을 경우 */
          ) : (
            data && data.map((book, index) => <BooksItem book={book.book} key={index} />) /* 평점이 있을 경우 */
          )}
        </ItemList>
      </LibraryRatingsMoreContainer>
    </>
  );
});

export default LibraryRatingsMore;
