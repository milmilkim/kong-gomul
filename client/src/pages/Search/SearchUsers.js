/**
 * 유저 검색결과 페이지
 */
import React, { memo } from "react";
import styled from "styled-components";

/* Components */
import UserItem from "../../components/UsersItem";

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
  return (
    <SearchUsersContainer>
      <h5 className="searchUsersTitle">검색결과</h5>
      <hr />

      {/* UserList 하드코딩 */}
      <ul>
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
      </ul>
    </SearchUsersContainer>
  );
});

export default SearchUsers;
