/**
 * styled button 컴포넌트
 */

import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  height: 2rem;
  border: none;
  border-radius: 3px;
  padding: 0 1rem;
  line-height: 2rem;
  background-color: ${(props) => props.theme.color.primaryColor};
  color: #fff;
  cursor: pointer;
`;

const StyledButton = ({ children }) => {
  return <ButtonContainer>{children}</ButtonContainer>;
};

export default StyledButton;
