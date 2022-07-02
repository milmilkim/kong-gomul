import React, { memo, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { getBookList } from "../slices/BookListSlice";
import BooksThumb from "../components/BooksThumb";

import styled from "styled-components";

const MainContainer = styled.div`
  section {
    padding: 20px 0;
  }

  h2 {
    font-size: 16px;
    font-weight: bold;
    margin: 10px 0;
  }

  ul.flex-row {
    justify-content: space-between;
  }
`;

const Main = memo(() => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.booklist);

  useEffect(() => {
    dispatch(
      getBookList({
        page: 1,
        size: 5,
      })
    );
  }, [dispatch]);

  console.log(data);

  return (
    <>
      <MainContainer>
        <div className="inner">
          <section>
            <h2>베스트셀러 순위</h2>
            <ul className="flex-row">
              <li>
                <BooksThumb size="medium" star="★★★★★" />
              </li>
              <li>
                <BooksThumb size="medium" star="★★★★★" />
              </li>
              <li>
                <BooksThumb size="medium" star="★★★★★" />
              </li>
              <li>
                <BooksThumb size="medium" star="★★★★★" />
              </li>
              <li>
                <BooksThumb size="medium" star="★★★★★" />
              </li>
            </ul>
          </section>
          <section>
            <h2>베스트셀러 순위</h2>
            <ul className="flex-row">
              <li>
                <BooksThumb size="medium" star="★★★★★" />
              </li>
              <li>
                <BooksThumb size="medium" star="★★★★★" />
              </li>
              <li>
                <BooksThumb size="medium" star="★★★★★" />
              </li>
              <li>
                <BooksThumb size="medium" star="★★★★★" />
              </li>
              <li>
                <BooksThumb size="medium" star="★★★★★" />
              </li>
            </ul>
          </section>
        </div>
      </MainContainer>
    </>
  );
});

export default Main;
