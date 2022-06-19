import React from "react";

import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

const SearchBox = styled.div`
  display: block;
  width: 250px;
  height: 40px;
  border-radius: 5px;
  background: #eee;

  form {
    position: relative;

    button {
      display: block;
      width: 40px;
      height: 40px;
      padding: 0;
      appearance: none;
      outline: none;
      border: none;
      cursor: pointer;

      .search-btn {
        height: inherit;
        padding: 10px;
        display: inline-block;
        width: 40px;
      }
    }

    .search-box {
      height: inherit;
      width: 180px;
      appearance: none;
      border: none;
      background-color: transparent;
      position: absolute;
      top: 12px;
      left: 35px;

      &:focus {
        outline: none;
      }
    }
  }
`;

const Search = () => {
  return (
    <SearchBox>
      <form>
        <button type="submit">
          <BiSearch className="search-btn" />
        </button>
        <input type="search" placeholder="도서 검색..." className="search-box" />
      </form>
    </SearchBox>
  );
};

export default Search;
