import React, { memo } from "react";
import styled from "styled-components";
import logo from "../assets/img/title_gray.png";

const SearchResultNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  padding: 0.5rem;

  img {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
  }

  p {
    text-align: center;
  }
`;

const SearchResultNotFound = memo(() => {
  return (
    <SearchResultNotFoundContainer>
      <img src={logo} alt="logo" />
      <p>검색결과가 없습니다.</p>
    </SearchResultNotFoundContainer>
  );
});

export default SearchResultNotFound;
