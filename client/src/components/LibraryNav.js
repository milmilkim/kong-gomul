/**
 * 내 서재 페이지 nav 컴포넌트
 */

import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const LibraryNavContainer = styled.nav`
  ul {
    display: flex;
    align-items: center;
    height: 3rem;
    margin-bottom: 1rem;

    li {
      margin-right: 1rem;

      a {
        display: inline-block;
        height: 3rem;
        font-size: 1rem;
        line-height: 3rem;
      }

      a.active {
        color: #4cd137;
        border-bottom: 3px solid #4cd137;
      }
    }
  }
`;

const LibraryNav = () => {
  return (
    <LibraryNavContainer>
      <ul>
        <li>
          <NavLink to="/library" end>
            전체
          </NavLink>
        </li>
        <li>
          <NavLink to="/library/ratings">별점순</NavLink>
        </li>
      </ul>
      <hr />
    </LibraryNavContainer>
  );
};

export default LibraryNav;
