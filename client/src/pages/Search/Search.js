/**
 * 검색 페이지
 */
import React, { memo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

/* Components */
import SearchResultItem from "../../components/SearchResultItem";

/* Styled Components */
const SearchContainer = styled.div`
  width: 1200px;
  margin: 0 auto;

  .searchResult {
    display: flex;
    flex-direction: column;

    .searchResultBar {
      display: flex;
      justify-content: space-between;
      align-content: center;
      margin-bottom: 1rem;

      .searchForm {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

        input {
          width: 100%;
          border: 1px solid #e9e9e9;
          padding: 0.5rem;
          margin-right: 1rem;
          outline: none;
          font-size: 1.125rem;
          font-weight: 700;
        }
      }

      .searchResultBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3rem;
        height: 3rem;
        border: none;
        border-radius: 3px;
        padding: 0 1rem;
        line-height: 2rem;
        background-color: ${(props) => props.theme.color.primaryColor};
        color: #fff;
        cursor: pointer;
      }
    }

    .searchResultBooks,
    .searchResultUsers {
      display: flex;
      margin-bottom: 1rem;
    }

    .searchResultBooks {
      .searchResultBooksLeft {
        width: 20%;
        padding: 0.5rem;

        span {
          display: inline-block;
          font-weight: 700;
        }
      }
      .searchResultBooksRight {
        width: 80%;
      }
    }

    .searchResultUsers {
      .searchResultUsersLeft {
        width: 20%;
        padding: 0.5rem;

        span {
          display: inline-block;
          font-weight: 700;
        }
      }
      .searchResultUsersRight {
        width: 80%;
      }
    }
  }
`;

const Search = memo(() => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const onChange = (e) => setValue(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/books?title=${value}`);
  };

  return (
    <SearchContainer>
      <div className="inner">
        <div className="searchResult">
          <div className="searchResultBar">
            {/* 검색창 */}
            <form onSubmit={onSubmit} className="searchForm">
              <input type="text" value={value} onChange={onChange} />
              <div className="searchResultBtn">
                <FaSearch />
              </div>
            </form>
          </div>

          <div className="searchResultBooks">
            <div className="searchResultBooksLeft">
              <span>책</span>
            </div>
            <div className="searchResultBooksRight">
              {/* 검색결과 아이템 하드코딩*/}
              <SearchResultItem />
              <SearchResultItem />
            </div>
          </div>

          <div className="searchResultUsers">
            <div className="searchResultUsersLeft">
              <span>유저</span>
            </div>
            <div className="searchResultUsersRight">
              {/* 검색결과 아이템 하드코딩*/}
              <SearchResultItem />
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </SearchContainer>
  );
});

export default Search;
