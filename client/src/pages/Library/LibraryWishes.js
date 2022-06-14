/**
 * 내 서재 보고싶어요 페이지
 */
import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

/* Components */
import BooksItem from "../../components/BooksItem";
import StyledButton from "../../components/StyledButton";
import ItemList from "../../components/ItemList";
import Spinner from "../../components/spinner";

/* Styled Components */
const LibraryWishesContainer = styled.div`
  width: 1200px;
  margin: 0 auto;

  .btnContainer {
    display: flex;
    margin-bottom: 1rem;
  }

  .libraryTitle {
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 2rem;
    margin-bottom: 1rem;
  }

  .ratingsWishesTitle {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 2rem;
    margin-bottom: 1rem;
  }
`;

const LibraryWishes = memo(() => {
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

  /* 뒤로가기 */
  const navigate = useNavigate();

  return (
    <>
      {/* Spinner */}
      <Spinner visible={isLoading} />

      <LibraryWishesContainer>
        <div className="btnContainer" onClick={() => navigate(-1)}>
          <StyledButton>
            <FaArrowLeft>뒤로가기</FaArrowLeft>
          </StyledButton>
        </div>

        <h5 className="ratingsWishesTitle">보고싶어요</h5>
        <hr />

        {/* Book List */}
        <ItemList>
          {data &&
            data.map((book, index) => (
              <BooksItem book={book} key={index}>
                <h3 className="booksItemTitle">{book.title}</h3>
              </BooksItem>
            ))}
        </ItemList>
      </LibraryWishesContainer>
    </>
  );
});

export default LibraryWishes;
