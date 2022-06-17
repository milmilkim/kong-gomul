import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: 1200px;
  min-height: 90vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Container = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
