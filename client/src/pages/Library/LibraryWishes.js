/**
 * 내 서재 보고싶어요 페이지
 */
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";

/* Slice */
import { getWishList } from "../../slices/WishSlice";

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

const LibraryWishes = memo(({ minHeight = 1 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.wish);

  useEffect(() => {
    dispatch(getWishList());
  }, [dispatch]);

  console.log(data);

  return (
    <>
      {/* Spinner */}
      <Spinner visible={loading} />

      <LibraryWishesContainer>
        <div className="btnContainer" onClick={() => navigate(-1)}>
          <StyledButton>
            <FaArrowLeft>뒤로가기</FaArrowLeft>
          </StyledButton>
        </div>
        <h5 className="ratingsWishesTitle">보고싶어요</h5>
        <hr />
        {/* Book List */}
        {data && <div>hello</div>}
      </LibraryWishesContainer>
    </>
  );
});

export default LibraryWishes;
