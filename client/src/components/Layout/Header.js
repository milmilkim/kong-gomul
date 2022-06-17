import React, { memo, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import logo from "../../assets/img/title_gray.png";
import profileImage from "../../assets/img/default.jpg";

import Search from "../Sub-components/Search";

import Login from "../Login";

import { useSelector } from "react-redux";

const HeaderContainer = styled.header`
  .flex-row {
    justify-content: space-between;
    align-items: center;
  }

  .title-logo {
    display: block;
    width: 90px;
    height: 30px;
    margin-right: 40px;
    background-image: url(${logo});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .nav-menu {
    .profile_image img {
      border-radius: 30px;
    }
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
        cursor: pointer;
      }
    }
  }
`;

const Header = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const { isLogin, info } = useSelector((state) => state.auth);

  const handleButton = (e) => {
    setIsOpen((isOpen) => !isOpen);
  };
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
              {isLogin ? (
                <li className="profile_image">
                  <img src={info.profile_image || profileImage} alt={info.nickname} width="35" />
                  {info.nickname}
                </li>
              ) : (
                <>
                  <li onClick={handleButton}>로그인</li>{" "}
                  <li>
                    <Link to="#" noreferrer="">
                      회원가입
                    </Link>
                  </li>
                </>
              )}
              <Login isOpen={isOpen} setIsOpen={setIsOpen} />
            </ul>
          </nav>
        </div>
        <hr />
      </div>
    </HeaderContainer>
  );
});

export default Header;
