/**
 * 유저 검색결과 페이지
 */
import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

/* Slice */
import { getSearchResult } from "../../slices/SearchSlice";

/* Components */
import Spinner from "../../components/spinner";
import UserItem from "../../components/UsersItem";
import { useQueryString } from "../../hooks/useQueryString";
import SearchResultNotFound from "../../components/SearchResultNotFound";

/* Styled Components */
const SearchUsersContainer = styled.div`
  width: 1200px;
  margin: 0 auto;

  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .searchUsersTitle {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 2rem;
    margin-bottom: 1rem;
  }
`;

const SearchUsers = memo(() => {
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

      <SearchUsersContainer>
        <h5 className="searchUsersTitle">검색결과</h5>
        <hr />

        {/* 유저 검색결과 */}
        {data && (
          <ul>
            {data.length === 0 ? (
              /* 검색 결과가 없을 경우 */
              <SearchResultNotFound />
            ) : (
              /* 검색 결과가 있을 경우 */
              data.map((d, i) => <UserItem key={i} user={d} />)
            )}
          </ul>
        )}
      </SearchUsersContainer>
    </>
  );
});

export default SearchUsers;
