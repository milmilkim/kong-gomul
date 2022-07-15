/**
 * 카테고리 페이지
 */
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

/* Slice */
import { getBookList } from "../../slices/BookListSlice";

/* Components */
import BooksItem from "../../components/BooksItem";
import Spinner from "../../components/spinner";

/* Styled Components */
const CategoryContainer = styled.div`
  width: 1200px;
  margin: 0 auto;

  .bookItemContainer {
    .booksItemInner {
      align-items: center;
      .bookItemTitle {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
    }
  }
`;

const CategoryItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Category = memo(() => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.booklist); // 검색결과, 로딩여부

  const [comicBookData, setcomicBookData] = useState(null);
  const [romanceBookData, setRomanceBookData] = useState(null);
  const [fantasyBookData, setFantasyBookData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const {
        payload: { data: comicData },
      } = await dispatch(
        getBookList({
          category: "만화 e북",
        })
      );

      const {
        payload: { data: romanceData },
      } = await dispatch(
        getBookList({
          category: "로판 e북",
        })
      );

      const {
        payload: { data: fantasyData },
      } = await dispatch(
        getBookList({
          category: "판타지 웹소설",
        })
      );

      setcomicBookData(comicData);
      setRomanceBookData(romanceData);
      setFantasyBookData(fantasyData);
    }

    fetchData();
  }, [dispatch]);

  return (
    <>
      {/* Spinner */}
      <Spinner visible={loading} />

      <CategoryContainer>
        {/* 좋아요 수가 가장 많은 작품을 표시 */}
        <CategoryItemList>
          {/* comic */}
          {comicBookData &&
            comicBookData
              .map((book, index) => (
                <div className="bookItemContainer" key={index}>
                  <BooksItem book={book} itemHref="/category/genres" itemWidth="100%">
                    <h4 className="bookItemTitle">만화</h4>
                  </BooksItem>
                </div>
              ))
              .slice(0, 1)}

          {/* romance */}
          {romanceBookData &&
            romanceBookData
              .map((book, index) => (
                <div className="bookItemContainer" key={index}>
                  <BooksItem book={book} itemHref="/category/genres" itemWidth="100%">
                    <h4 className="bookItemTitle">로맨스</h4>
                  </BooksItem>
                </div>
              ))
              .slice(0, 1)}

          {/* fantasy */}
          {fantasyBookData &&
            fantasyBookData
              .map((book, index) => (
                <div className="bookItemContainer" key={index}>
                  <BooksItem book={book} itemHref="/category/genres" itemWidth="100%">
                    <h4 className="bookItemTitle">판타지</h4>
                  </BooksItem>
                </div>
              ))
              .slice(0, 1)}
        </CategoryItemList>
      </CategoryContainer>
    </>
  );
});

export default Category;
