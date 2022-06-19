import React from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/img/icon.png";

import styled from "styled-components";
import { GoGear } from "react-icons/go";

// import BooksItem from "../../components/BooksItem";

const ProfileContainer = styled.div`
  text-align: center;

  button {
    appearance: none;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  section {
    width: 600px;
    margin: 0 auto;

    &.con1 {
      justify-content: center;
      align-items: center;
      text-align: left;
      padding: 40px;

      div:nth-of-type(2) {
        width: 300px;
      }

      h2 {
        font-weight: bold;
        padding: 5px 0;
      }

      p {
        font-size: 12px;
        padding: 5px 0;
      }

      .icon-container {
        margin-right: 20px;
        img {
          width: 80px;
        }
      }

      .edit-btn {
        width: 25px;
        height: 25px;
      }
    }

    &.con2 {
      padding: 20px 0;

      p {
        font-size: 16px;
        font-weight: bold;
        padding: 5px 0;

        &.analysis {
          font-size: 14px;
          font-weight: bold;
          text-decoration: underline;

          &:hover {
            color: #b027a9;
          }
        }
      }

      .flex-row {
        justify-content: space-evenly;
        align-items: center;
        padding: 20px 0;
      }

      img {
        width: 100px;
        margin: 10px 0;
      }
    }

    &.con3 {
      padding: 20px 0;
      text-align: left;
      position: relative;

      p {
        font-weight: bold;
        margin-bottom: 20px;
      }

      .more-btn {
        display: block;
        width: 80px;
        height: 30px;
        border-radius: 5px;
        position: absolute;
        top: 12px;
        right: 0;
        background-color: #333;
        color: #eee;
      }

      .recent-list {
        li {
          margin-right: 40px;
        }
      }
    }
  }
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <div className="inner">
        <section className="con1 flex-row">
          <div className="icon-container">
            <img src={icon} alt="나의 프로필" />
          </div>
          <div>
            <h2>여기에 닉네임</h2>
            <p>여기에 한마디</p>
          </div>
          <button type="button">
            <GoGear className="edit-btn" />
          </button>
        </section>

        <section className="con2">
          <p className="analysis">
            <Link to="/">취향분석</Link>
          </p>
          <div className="flex-row">
            <div>
              <img src={icon} alt="보고싶어요" />
              <p>
                <Link to="">보고싶어요</Link>
              </p>
            </div>
            <div>
              <img src={icon} alt="서재" />
              <p>
                <Link to="">서재</Link>
              </p>
            </div>
          </div>
        </section>

        <section className="con3">
          <p>최근 조회한 작품</p>
          <button className="more-btn">더보기</button>
          <ul className="recent-list flex-row">
            <li>
              <a href="#">
                <img src="https://via.placeholder.com/75x100" alt="책 이미지"></img>
              </a>
            </li>
            <li>
              <a href="#">
                <img src="https://via.placeholder.com/75x100" alt="책 이미지"></img>
              </a>
            </li>
            <li>
              <a href="#">
                <img src="https://via.placeholder.com/75x100" alt="책 이미지"></img>
              </a>
            </li>
          </ul>
          {/* axios로 불러온 책 데이터 */}
          {/* <BooksItem /> */}
        </section>
      </div>
    </ProfileContainer>
  );
};

export default Profile;
