import React, { memo, useEffect } from "react";
import Container from "../components/Layout/Container";

import { useSelector, useDispatch } from "react-redux";

import { getBookList } from "../slices/BookListSlice";

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
      <Container>
        <h1>Main!</h1>
        {/* {data.map((v, i) => {
          <li key={i}>
            <a href="#">

            </a>
          </li>;
        })} */}
      </Container>
    </>
  );
});

export default Main;
