import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import like from "../../assets/img/like.png";
import comment from "../../assets/img/comment.png";

const ReviewItemContainter = styled.div`
  width: 100%;
  padding: 15px;
  background-color: #eee;
  border-radius: 5px;

  .profile {
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }

  .review {
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }

  .comment {
    padding: 10px 0;
    border-bottom: 1px solid #ddd;

    img {
      vertical-align: middle;
      margin-right: 5px;
    }

    span {
      font-size: 14px;
      margin-right: 20px;
    }
  }

  .like-btn {
    padding-top: 10px;
  }
`;

const ReviewItem = () => {
  return (
    <ReviewItemContainter>
      <div className="profile">
        아이콘
        {/* <Link to={`/member/${member.id}`}>
              <ProfileImage src={member.profile_image} alt={member.nickname} />
              <div>{member.nickname.length > 10 ? member.nickname.substr(0, 10) + "..." : member.nickname}</div>
              {review.rating && (
                <div className="rating">
                  <FaStar />
                  {review.rating}점
                </div>
              )}
            </Link> */}
      </div>
      <div className="review">내용</div>
      <div className="comment">
        <img src={like} alt="좋아요" width={15} />
        <span>좋아요 555</span>
        <img src={comment} alt="댓글" width={15} />
        <span>코멘트 52</span>
      </div>
      <div className="like-btn">좋아요</div>
    </ReviewItemContainter>
  );
};

export default ReviewItem;
