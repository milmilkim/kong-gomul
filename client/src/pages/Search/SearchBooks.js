/**
 * 책 검색결과 페이지
 */
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

/* Slice */
import { getSearchResult } from "../../slices/SearchSlice";

/* Components */
import BooksItem from "../../components/BooksItem";
import ItemList from "../../components/ItemList";
import Spinner from "../../components/spinner";

/* Custom Hooks */
import { useQueryString } from "../../hooks/useQueryString";
import ResultNotFound from "../../components/ResultNotFound";

/* Styled Components */
const SearchBooksContainer = styled.div`
  width: 1200px;
  margin: 0 auto;

  .searchBooksTitle {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 2rem;
    margin-bottom: 1rem;
  }
`;

const SearchBooks = memo(() => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.search); // 검색결과, 로딩여부

  // Search 페이지에서 입력한 input 값
  const qs = useQueryString();
  const { query, type } = qs;

  // 페이지가 열렸을 때,
  useEffect(() => {
    // axios 요청을 한다.
    dispatch(
      getSearchResult({
        query: query,
        type: type,
      })
    );
  }, [dispatch, query, type]);

  return (
    <>
      {/* Spinner */}
      <Spinner visible={loading} />

      <SearchBooksContainer>
        <h5 className="searchBooksTitle">검색결과</h5>
        <hr />

        {/* 책 검색결과 */}
        {data && (
          <ItemList>
            {data.length === 0 ? (
              /* 검색 결과가 없을 경우 */
              <ResultNotFound />
            ) : (
              /* 검색 결과가 있을 경우 */
              data.map((d, i) => (
                <BooksItem book={d} key={i} className="searchBooksItem">
                  <div className="booksItemTitle">{d.title}</div>
                  <span>{d.authors?.map((author) => author.name + " ")}</span>
                  <span>{d.publishers?.map((publisher) => publisher.name + " ")}</span>
                  <span>{d.genres?.map((genre) => genre.genre + " ")}</span>
                </BooksItem>
              ))
            )}
          </ItemList>
        )}
      </SearchBooksContainer>
    </>
  );
});

export default SearchBooks;
