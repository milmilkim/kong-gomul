import React, { memo, useEffect } from "react";
import books from "../assets/json/book.json";

import { useSelector, useDispatch } from "react-redux";
import { getBookList } from "../slices/BookListSlice";

import styled from "styled-components";

const MainContainer = styled.main`
  padding: 0;
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
    <MainContainer>
      <div className="inner">
        {error ? (
          <h1>Oops~! Error~!</h1>
        ) : (
          data && (
            <>
              <h1>성공!</h1>
            </>
          )
        )}
      </div>

      {/* <div className="inner">
        {books.map((book, index) => (
          <ul key={index}>
            <a href={book.ridiUrl}>
              <li>
                <img width="100" src={book.thumbnail} alt={book.title} />
              </li>
              <li>{book.title}</li>
              <li>{book.authors.join(", ")}</li>
              <li>{book.categories.join(", ")}</li>
            </a>
          </ul>
        ))}
      </div> */}
    </MainContainer>
  );
});

export default Main;
