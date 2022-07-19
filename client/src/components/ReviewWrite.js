import Modal from "./Modal";
import { useState } from "react";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { addReviewItem } from "../slices/ReviewSlice";

import Star from "../components/Star";

const ReviewWriteContainer = styled(Modal)`
  text-align: center;
  input[type="text"] {
    display: block;
    height: 70px;
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
    setNewReview(next);
  };

  return (
    <ReviewWriteContainer isOpen={isOpen} setIsOpen={setIsOpen} background={true} width={400}>
      <h3>리뷰 작성하기</h3>
      <hr />
      <Star rating={rating} setRating={setRating} />
      <span>스포일러 주의</span>
      <input type="checkbox" name="is_spoiler" onChange={onCheck} />
      <form onChange={onChange} onSubmit={onSubmit}>
        <input type="text" name="contents" placeholder="리뷰를 작성해주세요." />
        <button type="submit">작성하기</button>
      </form>
    </ReviewWriteContainer>
  );
};

export default ReviewWrite;
