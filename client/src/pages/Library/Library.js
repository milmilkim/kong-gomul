/**
 * 내 서재 페이지
 */
import React, { memo } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

/* Styled Components */
const LibraryContainer = styled.div`
  width: 1200px;
  margin: 0 auto;

  .libraryTitle {
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 2rem;
    margin-bottom: 1rem;
  }
`;

const Library = memo(() => {
  return (
    <LibraryContainer>
      {/* Title */}
      <NavLink to="/library">
        <h3 className="libraryTitle">내 서재</h3>
      </NavLink>

      <Outlet />
    </LibraryContainer>
  );
});

export default Library;
