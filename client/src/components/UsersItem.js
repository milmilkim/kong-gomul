/**
 * 유저 리스트 아이템 컴포넌트
 */

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/* Styled Components */
const UsersItemContainer = styled.li`
  width: 49.5%;
  height: 100%;
  padding: 8px;
  margin-bottom: 1rem;
  border: 1px solid #e9e9e9;
  border-radius: 5px;

  .usersItemInner {
    display: flex;
    align-content: center;

    .userImage {
      width: 75px;
      height: 75px;
      border: 1px solid #e9e9e9;
      border-radius: 75px;
      overflow: hidden;
      margin-right: 0.5rem;

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .userInfo {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .userInfoTitle {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }
    }
  }
`;

const UsersItem = ({ children }) => {
  return (
    <UsersItemContainer>
      <Link to="/">
        <div className="usersItemInner">
          <div className="userImage">
            <img src="https://via.placeholder.com/75" alt="placeholder" />
          </div>
          <div className="userInfo">
            <h5 className="userInfoTitle">lorem</h5>
            <p>
              평가 <span>999</span>
            </p>
          </div>
        </div>
      </Link>
    </UsersItemContainer>
  );
};

export default UsersItem;
