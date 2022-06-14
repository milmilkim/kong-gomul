/**
 * 내 서재 별점순 더보기 페이지
 */
import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";

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

  /* 파라미터로 전달받은 rating을 가져온다. */
  const { rating } = useParams();
  const ratingTitle = parseFloat(rating) / 2;

  /* 뒤로가기 */
  const navigate = useNavigate();

  return (
    <>
      {/* Spinner */}
      <Spinner visible={isLoading} />

      <LibraryRatingsMoreContainer>
        <div className="btnContainer" onClick={() => navigate(-1)}>
          <StyledButton>
            <FaArrowLeft>뒤로가기</FaArrowLeft>
          </StyledButton>
        </div>

        <h5 className="ratingsMoreTitle">{ratingTitle}점을 준 도서</h5>
        <hr />

        {/* Book List */}
        <ItemList>{data && data.map((book, index) => <BooksItem book={book} key={index} />)}</ItemList>
      </LibraryRatingsMoreContainer>
    </>
  );
});

export default LibraryRatingsMore;
