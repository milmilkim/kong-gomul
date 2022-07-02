import React from "react";
import styled from "styled-components";

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

const ReviewThumb = () => {
  return (
    <ReviewThumbContainer>
      <p>아이디</p>
      <p>★★★★★</p>
      <p>내용</p>
      <hr />
      <p>❤</p>
    </ReviewThumbContainer>
  );
};

export default ReviewThumb;
