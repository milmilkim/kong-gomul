import React from "react";

import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

const SearchBox = styled.div`
  display: block;
  width: 250px;
  height: 40px;
  border-radius: 5px;
  background: #eee;
  position: relative;

  .search-box {
    height: inherit;
    width: 180px;
    appearance: none;
    border: none;
    background-color: transparent;
    position: absolute;

    &:focus {
      outline: none;
    }
  }

  .search-btn {
    height: 40px;
    display: inline-block;
    padding: 10px;
    width: 40px;
  }
`;

const Search = () => {
  return (
    <SearchBox>
      <BiSearch className="search-btn" />
      <input type="search" placeholder="도서 검색..." className="search-box" />
    </SearchBox>
  );
};

export default Search;
