import styled from "styled-components";

const SectionContainer = styled.section`
  border-radius: 10px;
  border: solid 1px #eee;
  padding: 20px;
  margin-bottom: 20px;
  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  ul {
    display: flex;
    justify-content: space-around;
    li {
      line-height: 1.5;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        font-weight: bold;
        font-size: 1.1rem;
      }
      .sub {
        color: #888;
      }
    }
  }
`;
const Section = ({ children }) => {
  return <SectionContainer>{children}</SectionContainer>;
};

export default Section;
