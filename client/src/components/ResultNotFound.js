import React, { memo } from "react";
import styled from "styled-components";
import logo from "../assets/img/title_gray.png";

const ResultNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  padding: 0.5rem;
  img {
    display: block;
    width: 200px;
    margin-bottom: 1rem;
  }
  p {
    text-align: center;
  }
`;

const ResultNotFound = memo(({ children = "검색결과가 없습니다." }) => {
  return (
    <ResultNotFoundContainer>
      <img src={logo} alt="logo" />
      <p>{children}</p>
    </ResultNotFoundContainer>
  );
});

export default ResultNotFound;