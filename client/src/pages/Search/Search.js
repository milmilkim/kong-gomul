/**
 * 검색 페이지
 */
import React, { memo, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import logo from "../../assets/img/title_gray.png";

/* Hooks */
import { useQueryString } from "../../hooks/useQueryString";

/* Slice */
import { getSearchResult } from "../../slices/SearchSlice";

/* Components */
import Spinner from "../../components/spinner";
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

      .searchSelect {
        width: 100px;
        padding: 0.8em 0.5em;
        border: 1px solid #e9e9e9;
        margin-right: 1rem;
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

    .searchResultNotFound {
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
    }
  }
`;

const Search = memo(() => {
  const { query } = useQueryString(); // 헤더 검색창에 입력한 검색어 query값
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.search); // 검색결과, 로딩여부
  let keyword = useRef(""); // 검색어
  const [selectedSearchType, setSelectedSearchType] = useState("books"); // 선택된 검색타입(책, 유저)

  const navigate = useNavigate();
  let timer;

  // 검색어 자동완성 이벤트
  const onChangeKeyword = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      dispatch(
        getSearchResult({
          query: keyword?.current?.value,
          type: selectedSearchType,
        })
      );
    });
  };

  // 검색타입 선택 이벤트
  const onChangeSelectBox = (e) => {
    setSelectedSearchType(e.target.value);
    keyword.current.value = "";
  };

  // 검색 이벤트
  const onSearch = async (e) => {
    e.preventDefault();

    // 검색어가 있을 경우, 페이지 이동
    if (keyword.current.value === "") {
      alert("검색어를 입력하세요");
    } else {
      navigate(`/search/${selectedSearchType}?query=${keyword.current.value}&type=${selectedSearchType}`);
    }
  };

  // 헤더 검색창 검색 이벤트
  useEffect(() => {
    dispatch(
      getSearchResult({
        query: query,
      })
    );
  }, [dispatch, query]);

  return (
    <>
      <Spinner visible={loading} />
      <SearchContainer>
        <div className="searchResult">
          <div className="searchResultBar">
            {/* 검색창 */}
            <form onSubmit={onSearch} className="searchForm">
              <input
                type="text"
                ref={keyword}
                onChange={(e) => {
                  if (e.target.value.length >= 2) {
                    onChangeKeyword();
                  }
                }}
              />

              {/* 검색타입 선택 */}
              <select onChange={onChangeSelectBox} className="searchSelect">
                <option value="books">책</option>
                <option value="users">유저</option>
              </select>

              {/* 검색버튼 */}
              <button className="searchResultBtn">
                <FaSearch />
              </button>
            </form>
          </div>

          {/* 검색어 자동완성 결과 */}
          {data && (
            <div className="searchResultBooks">
              <div className="searchResultBooksLeft">
                <span>검색결과</span>
              </div>

              <div className="searchResultBooksRight">
                {data.length === 0 ? (
                  /* 검색 결과가 없을 경우 */
                  <div className="searchResultNotFound">
                    <img src={logo} alt="logo" />
                    <p>검색결과가 없습니다.</p>
                  </div>
                ) : (
                  /* 검색 결과가 있을 경우 */
                  data.map((result, index) => <SearchResultItem key={index} result={result} />)
                )}
              </div>
            </div>
          )}
        </div>
        <Outlet />
      </SearchContainer>
    </>
  );
});

export default Search;
