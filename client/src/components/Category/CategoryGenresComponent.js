import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

/* Slice */
import { getBookList } from "../../slices/BookListSlice";

/* Components */
import ItemList from "../../components/ItemList";
import BooksItem from "../../components/BooksItem";
import Spinner from "../../components/spinner";

/* Styled Components */
const CategoryGenresComponentContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const CategoryGenresComponent = memo(({ genre }) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.booklist);

  // 페이지 번호 상태값
  const [page, setPage] = useState(1);
  // 무한 스크롤 관련
  const [ref, inView] = useInView({
    threshold: 1,
  });

  const getContent = useCallback(
    (p = 1) => {
      if (p > 30) {
        return;
      }
      setPage(p);
      dispatch(
        getBookList({
          category: genre,
          page: p,
        })
      );
    },
    [dispatch, genre]
  );

  // 최초 페이지를 열었을 때, 데이터를 가져온다.
  useEffect(() => {
    getContent(1);
  }, [getContent, dispatch, genre]);

  // 마지막 요소일 때, 데이터를 가져온다.
  useEffect(() => {
    if (inView && !loading) {
      getContent(page + 1);
    }
  }, [getContent, inView, page, loading]);

  return (
    <CategoryGenresComponentContainer>
      {/* Spinner */}
      <Spinner visible={loading} />

      {/* Book List */}
      <ItemList>
        {data &&
          data.map((book, i) => {
            return (
              <BooksItem
                key={i}
                book={book}
                itemHref={`/bookinfo/${book.id}`}
                {...(!loading && data.length - 1 === i ? { inview: ref } : {})}
              />
            );
          })}
      </ItemList>
    </CategoryGenresComponentContainer>
  );
});

export default CategoryGenresComponent;
