import React from "react";
import styled from "styled-components";

import { FaStar } from "react-icons/fa";
import ProfileImage from "../../components/ProfileImage";
import ReviewItem from "../../components/Review/ReviewItem";

const ReviewListContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 30px 0;

  .page-inner {
    width: 640px;
    margin: 0 auto;
  }
`;

const ReviewList = ({ review }) => {
  // const { rating, contents, member } = review;
  return (
    <ReviewListContainer>
      <div className="page-inner">
        {/* {data.map((v, i) => { ... })} */}
        <ReviewItem />
      </div>
    </ReviewListContainer>
  );
};

export default ReviewList;
