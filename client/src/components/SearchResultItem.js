/**
 * 검색결과 리스트 아이템 컴포넌트
 */

import React from "react";
import styled from "styled-components";

const SearchResultItemcontainer = styled.div`
  .searchResultItems {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;

    .searchItemImage {
      width: 75px;
      height: 100px;
      border-radius: 5px;
      margin-right: 1rem;
      overflow: hidden;

      img {
        display: block;
        width: 100%;
      }
    }
  }
`;

const SearchResultItem = ({ result }) => {
  return (
    <SearchResultItemcontainer>
      <a href={result?.ridi_url || "/"}>
        <div className="searchResultItems">
          <div className="searchItemImage">
            <img src={result?.thumbnail || result?.profile_image} alt={result?.title || result?.nickname} />
          </div>
          <div className="searchItemInfo">
            <h5 className="searchItemInfoTitle">{result?.title || result?.nickname}</h5>
          </div>
        </div>
      </a>
    </SearchResultItemcontainer>
  );
};

export default SearchResultItem;
