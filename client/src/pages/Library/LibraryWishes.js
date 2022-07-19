/**
 * 내 서재 보고싶어요 페이지
 */
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { CellMeasurer } from "react-virtualized";

/* Slice */
import { getMyProfile } from "../../slices/MemberSlice";
import { getWishList } from "../../slices/WishSlice";

/* Components */
import StyledButton from "../../components/StyledButton";
import Spinner from "../../components/spinner";
import BooksItem from "../../components/BooksItem";
import { cache, MasonryComponent } from "../../components/MasonryComponent";
import ResultNotFound from "../../components/ResultNotFound";

/* Styled Components */
const LibraryWishesContainer = styled.div`
  width: 1200px;
  margin: 0 auto;

  .btnContainer {
    display: flex;
    margin-bottom: 1rem;
  }

  .ratingsWishesTitle {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 2rem;
    margin-bottom: 1rem;
  }

  .booksItemImage {
    width: 100%;
    height: 22rem;
    border: 1px solid #e9e9e9;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  .booksItemTitle {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.375rem;
  }
`;

const LibraryWishes = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.wish);
  const [memberId, setMemberId] = useState(); // 멤버 아이디
  const [wishList, setWishList] = useState(); // 유저가 보고싶어요한 목록

  /* 무한 스크롤 */
  const cellRenderer = ({ index, key, parent, style }) => {
    const book = data[index].book;

    return (
      <CellMeasurer cache={cache} parent={parent} key={key} index={index}>
        {({ measure, registerChild }) => (
          <div style={style} ref={registerChild}>
            <BooksItem book={book} itemHref={`/bookinfo/${book.id}`} itemWidth={"100%"}>
              <h4 className="booksItemTitle">{book.title}</h4>
            </BooksItem>
          </div>
        )}
      </CellMeasurer>
    );
  };

  useEffect(() => {
    async function fetchData() {
      const {
        payload: {
          data: { id },
        },
      } = await dispatch(getMyProfile()); // 멤버 아이디를 가져온다.
      setMemberId(id);

      const {
        payload: { data: rows },
      } = await dispatch(getWishList());

      setWishList(rows);
    }

    fetchData();
  }, [dispatch]);

  return !memberId ? (
    <ResultNotFound>로그인 상태가 아닙니다.</ResultNotFound>
  ) : (
    <>
      {/* Spinner */}
      <Spinner visible={loading} />

      <LibraryWishesContainer>
        {/* 뒤로가기 버튼 */}
        <div className="btnContainer" onClick={() => navigate(-1)}>
          <StyledButton>
            <FaArrowLeft>뒤로가기</FaArrowLeft>
          </StyledButton>
        </div>

        {/* 보고싶어요 페이지 타이틀 */}
        <h5 className="ratingsWishesTitle">보고싶어요</h5>
        <hr />

        {/* 보고싶어요 책 리스트 */}
        {wishList && <MasonryComponent data={wishList} cellRenderer={cellRenderer} />}
      </LibraryWishesContainer>
    </>
  );
});

export default LibraryWishes;
