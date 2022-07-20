import React from "react";
import styled from "styled-components";
import StarRatings from "react-star-ratings";
import ProfileImage from "./ProfileImage";

import { Link } from "react-router-dom";

const ReviewThumbContainer = styled.div`
  display: block;
  width: 200px;
  height: 230px;
  padding: 25px 20px;
  background-color: #ddd;
  text-align: left;

  img {
    width: 30px;
    height: 30px;
  }

  p {
    padding-bottom: 10px;
  }
`;

const ReviewThumb = ({ review }) => {
  const { rating, contents, member } = review;

  return (
    <ReviewThumbContainer>
      <Link to={`/member/${member.id}`}>
        <ProfileImage src={member.profile_image} alt={member.nickname} />
        <p>{member.nickname.length > 10 ? member.nickname.substr(0, 10) + "..." : member.nickname}</p>
      </Link>
      {review.rating && (
        <>
          <StarRatings
            rating={rating}
            numberOfStars={5}
            name="rating"
            starDimension="13px"
            starSpacing="2px"
            starRatedColor="#FA722E"
          />
          {rating}점
        </>
      )}
      <p>{contents}</p>
    </ReviewThumbContainer>
  );
};

export default ReviewThumb;
