/**
 * 내 서재 페이지 (전체) 컴포넌트
 */
import React, { memo } from "react";
import styled from "styled-components";
import { CellMeasurer } from "react-virtualized";

/* Components */
import BooksItem from "../BooksItem";
import ItemList from "../ItemList";
import LibraryNav from "./LibraryNav";
import Spinner from "../spinner";
import { cache, MasonryComponent } from "../MasonryComponent";
import ResultNotFound from "../ResultNotFound";

/* Styled Components */
const LibraryAllComponentContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const LibraryAllComponent = memo(({ memberId, loading, reviewList }) => {
  /* 무한 스크롤 */
  const cellRenderer = ({ index, key, parent, style }) => {
    const book = reviewList[index];

    return (
      <CellMeasurer cache={cache} parent={parent} key={key} index={index}>
        {({ measure, registerChild }) => (
          <div style={style} ref={registerChild}>
            <BooksItem book={book} itemWidth={"100%"} />
          </div>
        )}
      </CellMeasurer>
    );
  };

  return !memberId ? (
    <ResultNotFound>로그인 상태가 아닙니다.</ResultNotFound>
  ) : (
    <LibraryAllComponentContainer>
      {/* Spinner */}
      <Spinner visible={loading} />

      {/* Navbar */}
      <LibraryNav />

      {/* Book List */}
      <ItemList>
        {reviewList && reviewList.length === 0 ? (
          <div>평가한 작품이 없습니다.</div> /* 평점이 없을 경우 */
        ) : (
          reviewList && <MasonryComponent data={reviewList} cellRenderer={cellRenderer} /> /* 평점이 있을 경우 */
        )}
      </ItemList>
    </LibraryAllComponentContainer>
  );
});

export default LibraryAllComponent;
