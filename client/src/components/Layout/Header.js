import React, { memo, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import styled from "styled-components";

import logo from "../../assets/img/title_gray.png";
import profileImage from "../../assets/img/default.jpg";
import ProfileImage from "../ProfileImage";
import Search from "../Search";

import Login from "../Login";

import { useSelector } from "react-redux";

const HeaderContainer = styled.header`
  padding: 15px 0;
  border-bottom: 1px solid ${(props) => props.theme.color.borderColor};
  margin-bottom: 10px;

  .flex-row {
    justify-content: space-between;
    align-items: center;
  }

  .title-logo {
    display: block;
    margin-right: 40px;
    img {
      width: 100px;
    }
  }

  .nav-menu {
    display: flex;
    .login-info {
      .profile_image img {
        border-radius: 30px;
        width: 35px;
        height: 35px;
      }

      li.join {
        border-radius: 5px;
        border: 1px solid #a2a2a2;
        padding: 10px;
        font-weight: bold;
      }
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

    li.search {
      color: gray;
      margin-left: auto;
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
            <Link to="/">
              <h1 className="blind-text">콩고물</h1>
              <img src={logo} alt="콩고물" />
            </Link>
          </div>

          <nav className="nav-menu">
            <ul>
              <li>
                <NavLink to="/category" noreferrer="">
                  로맨스
                </NavLink>
              </li>
              <li>
                <NavLink to="/category" noreferrer="">
                  판타지
                </NavLink>
              </li>
              <li>
                <NavLink to="/category" noreferrer="">
                  만화
                </NavLink>
              </li>
              <li className="search">
                <NavLink to="/search" noreferrer="">
                  검색
                </NavLink>
              </li>
            </ul>
          </nav>

          <Search />

          <nav className="nav-menu">
            <ul className="login-info">
              {isLogin ? (
                <Link to="/mypage">
                  <li className="profile_image">
                    <ProfileImage src={info.profile_image || profileImage} alt={info.nickname} />
                  </li>
                </Link>
              ) : (
                <>
                  <li onClick={handleButton}>로그인</li>{" "}
                  <li className="join">
                    <Link to="/join" noreferrer="">
                      회원가입
                    </Link>
                  </li>
                </>
              )}
              <Login isOpen={isOpen} setIsOpen={setIsOpen} />
            </ul>
          </nav>
        </div>
      </div>
    </HeaderContainer>
  );
});

export default Header;
