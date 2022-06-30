import Modal from "./Modal";
import axios from "axios";
import { useState } from "react";

import styled from "styled-components";

const ReviewWriteContainer = styled(Modal)`
  text-align: center;
  input[type="text"] {
    display: block;
    height: 70px;
  }
`;

const ReviewWrite = ({ isOpen, setIsOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ReviewWriteContainer isOpen={isOpen} setIsOpen={setIsOpen} background={true} width={400}>
      <h3>리뷰 작성하기</h3>
      <hr />
      <form>
        <input type="text" placeholder="리뷰를 작성해주세요." />
        <span>스포일러 주의</span>
        <input type="checkbox" />
        <button type="submit">작성하기</button>
      </form>
    </ReviewWriteContainer>
  );
};

export default ReviewWrite;
