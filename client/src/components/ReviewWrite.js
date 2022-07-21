import Modal from "./Modal";
import { useState } from "react";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { addReviewItem } from "../slices/ReviewSlice";

import Star from "../components/Star";
import TextArea from "./Form/TextArea";
import Switch from "./Form/Switch";

const ModalContainer = styled.div`
  button {
    text-align: center;
    cursor: pointer;
    border-radius: 10px;
    margin: 0;
    &.save {
      width: 100px;
      margin: auto;
      margin-top: 50px;
      transition: all 300ms ease;
    }
  }
`;

const ReviewWrite = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(null);

  //책 아이디 가져오기
  const {
    data: { id: book_id },
  } = useSelector((state) => state.bookInfo);
  const [newReview, setNewReview] = useState("");

  // const { data: result, error, loading } = useSelector((state) => state.review);

  //input
  const onChange = (e) => {
    const next = {
      ...newReview,
      [e.target.name]: e.target.value,
    };
    setNewReview(next);
  };

  //리뷰 작성
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addReviewItem({ data: { ...newReview, rating }, book_id }));
    setIsOpen(false);
  };

  const onCheck = (e) => {
    const next = {
      ...newReview,
      is_spoiler: e.target.checked,
    };
    console.log(next);
    setNewReview(next);
  };

  return (
    <ModalContainer>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} background={true} width={400}>
        <h3>리뷰 작성하기</h3>
        <hr />
        <Star rating={rating} setRating={setRating} />
        <form onChange={onChange}>
          <TextArea
            type="text"
            name="contents"
            placeholder="자유롭게 리뷰를 적어주세요"
            maxLength={10000}
            height={"150px"}
          />
        </form>
        <Switch label="스포일러 주의!" name="is_spoiler" onChange={onCheck} />
        <button className="save" type="submit" onClick={onSubmit}>
          작성하기
        </button>
      </Modal>
    </ModalContainer>
  );
};

export default ReviewWrite;
