import React from "react";
import styled from "styled-components";
import StarRatings from "react-star-ratings";

const ReviewThumbContainer = styled.div`
  display: block;
  width: 200px;
  height: 230px;
  padding: 25px 20px;
  background-color: #ddd;
  text-align: left;

  p {
    padding-bottom: 10px;
  }
`;

const ReviewThumb = ({ review }) => {
  const { rating, contents, member } = review;

  return (
    <ReviewThumbContainer>
      <p>{member.nickname}</p>
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
