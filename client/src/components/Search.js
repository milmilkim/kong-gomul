import React, { useState } from "react";

import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

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
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  // 검색 이벤트
  const onSearch = async (e) => {
    e.preventDefault();
    setKeyword("");
    navigate(`/search?query=${keyword}`);
  };

  const onChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <SearchBox>
      <form onSubmit={onSearch}>
        <button type="submit">
          <BiSearch className="search-btn" />
        </button>
        <input type="search" value={keyword} onChange={onChange} placeholder="도서 검색..." className="search-box" />
      </form>
    </SearchBox>
  );
};

export default Search;
