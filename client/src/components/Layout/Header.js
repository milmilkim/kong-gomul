import React, { memo } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import logo from "../../assets/img/title_gray.png";

import Search from "../Sub-components/Search";

const HeaderContainer = styled.header`
  padding-top: 15px;

  .flex-row {
    justify-content: space-between;
    align-items: center;
  }

  .title-logo {
    display: block;
    width: 100px;
    height: 40px;
    margin-right: 40px;
    background-image: url(${logo});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .nav-menu {
    &:first-of-type {
      font-size: 14px;
      font-weight: bold;
      margin-right: 200px;
    }

    &:nth-of-type(2) {
      font-size: 12px;
      margin-left: 20px;
    }

    & > ul {
      display: inline-block;

      & > li {
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
`;

const Header = memo(() => {
  return (
    <HeaderContainer>
      <div className="inner">
        <div className="flex-row">
          <div className="title-logo">
            <h1 className="blind-text">
              <a href="/">콩고물</a>
            </h1>
          </div>

          <nav className="nav-menu">
            <ul>
              <li>
                <Link to="#" noreferrer="">
                  로맨스
                </Link>
              </li>
              <li>
                <Link to="#" noreferrer="">
                  판타지
                </Link>
              </li>
              <li>
                <Link to="#" noreferrer="">
                  만화
                </Link>
              </li>
            </ul>
          </nav>

          <Search />

          <nav className="nav-menu">
            <ul>
              <li>
                <Link to="#" noreferrer="">
                  로그인
                </Link>
              </li>
              <li>
                <Link to="#" noreferrer="">
                  회원가입
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <hr />
      </div>
    </HeaderContainer>
  );
});

export default Header;
