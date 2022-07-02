/**
 * 유저 검색결과 페이지
 */
import axios from "axios";
import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "../../components/spinner";

/* Components */
import UserItem from "../../components/UsersItem";
import { useQueryString } from "../../hooks/useQueryString";

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
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Search 페이지에서 입력한 input 값
  const qs = useQueryString();
  const { query, type } = qs;

  // 유저 리스트 가져오기
  const getUserList = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/search/users?query=${query}&type=${type}`);
      setData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      // ajax 로딩 종료
      setIsLoading(false);
    }
  }, [query, type]);

  // 페이지가 열렸을 때,
  useEffect(() => {
    // 로딩 시작을 하고
    setIsLoading(true);

    // axios 요청을 한다.
    getUserList();
  }, [getUserList]);

  return (
    <>
      {/* Spinner */}
      <Spinner visible={isLoading} />

      <SearchUsersContainer>
        <h5 className="searchUsersTitle">검색결과</h5>
        <hr />
        <ul>{data && data.map((d, i) => <UserItem key={i} user={d} />)}</ul>
      </SearchUsersContainer>
    </>
  );
});

export default SearchUsers;
