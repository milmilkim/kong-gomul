import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import ProfileImage from "../ProfileImage";
import { FaStar } from "react-icons/fa";

const ReviewItemContainter = styled.div`
  display: block;
  width: 100%;
  min-height: 300px;
  padding: 25px 20px;
  background-color: #f2f2f2;
  text-align: left;
  margin-bottom: 20px;
  white-space: pre-line;
  .profile {
    display: flex;
    align-items: center;
    font-weight: bolder;
    padding-bottom: 10px;
    border-bottom: solid 1px ${(props) => props.theme.color.borderColor};
    margin-bottom: 20px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      margin-right: 5px;
    }

    .rating {
      margin-left: auto;
      background-color: #fff;
      padding: 5px 10px;
      display: flex;
      border-radius: 15px;
    }
  }

  summary {
    cursor: pointer;
    outline: none;
  }

  .contents {
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.3;

    word-wrap: break-word;
  }
`;

const ReviewItem = ({ data, inview }) => {
  return (
    <ReviewItemContainter ref={inview}>
      <Link to={`/member/${data.member.id}`}>
        <div className="profile">
          <ProfileImage src={data.member.profile_image} alt={data.member.nickname} />
          <div>
            {data.member.nickname.length > 10 ? data.member.nickname.substr(0, 10) + "..." : data.member.nickname}
          </div>
          {data.rating && (
            <div className="rating">
              <FaStar />
              {data.rating}점
            </div>
          )}
        </div>
      </Link>

      <div className="contents">
        {data.is_spoiler ? (
          <details>
            <summary>스포일러 보기</summary>
            <Link to="/">{data.contents}</Link>
          </details>
        ) : (
          <Link to="/">{data.contents}</Link>
        )}
      </div>
    </ReviewItemContainter>
  );
};

export default ReviewItem;
