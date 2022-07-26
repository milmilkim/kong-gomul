import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import ProfileImage from "../ProfileImage";

import { Link } from "react-router-dom";

const ReviewThumbContainer = styled.div`
  display: block;
  width: 100%;
  height: 300px;
  padding: 25px 20px;
  background-color: #f2f2f2;
  text-align: left;
  margin-bottom: 100px;

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
    display: -webkit-box;
    -webkit-line-clamp: 5; /* 라인수 */
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
`;

const ReviewThumb = ({ review }) => {
  const { rating, contents, member } = review;

  return (
    <ReviewThumbContainer>
      <Link to={`/member/${member.id}`}>
        <div className="profile">
          <ProfileImage src={member.profile_image} alt={member.nickname} />
          <div>{member.nickname.length > 10 ? member.nickname.substr(0, 10) + "..." : member.nickname}</div>
          {review.rating && (
            <div className="rating">
              <FaStar />
              {review.rating}점
            </div>
          )}
        </div>
      </Link>

      <div className="contents">
        {review.is_spoiler ? (
          <details>
            <summary>스포일러 보기</summary>
            <Link to="/">{contents}</Link>
          </details>
        ) : (
          <Link to="/">{contents}</Link>
        )}
      </div>
    </ReviewThumbContainer>
  );
};

export default ReviewThumb;
