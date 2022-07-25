import Modal from "./Modal";
import { useState } from "react";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { addReviewItem } from "../slices/ReviewSlice";

import TextArea from "./Form/TextArea";
import Switch from "./Form/Switch";

const ModalContainer = styled.div`
  .button_container {
    width: 100%;
    display: flex;
    justify-content: center;
    button.save {
      text-align: center;
      cursor: pointer;
      border-radius: 10px;
      padding: 10px 5px;
      width: 100px;
      transition: all 300ms ease;
      margin-top: 30px;
    }
  }
`;

const ReviewWrite = ({ isOpen, setIsOpen, myReview, setMyReview }) => {
  const dispatch = useDispatch();

  const {
    data: { id: book_id },
  } = useSelector((state) => state.bookInfo);
  const [newReview, setNewReview] = useState("");

  // const { data: result, error, loading } = useSelector((state) => state.review);

  //input
  const onChange = (e) => {
    const next = {
      ...myReview,
      [e.target.name]: e.target.value,
    };
    setNewReview(next);
  };

  //리뷰 작성
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addReviewItem({ data: { ...newReview }, book_id }));
    setMyReview({ ...newReview, book_id });
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
    <ModalContainer>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} background={true} width={400}>
        <form onChange={onChange}>
          <TextArea
            type="text"
            name="contents"
            placeholder="자유롭게 리뷰를 적어주세요"
            maxLength={10000}
            height={"200px"}
            defaultValue={myReview.contents || null}
          />
        </form>
        <Switch label="스포일러 주의!" name="is_spoiler" onChange={onCheck} defaultChecked={myReview.is_spoiler} />
        <div className="button_container">
          <button className="save" type="submit" onClick={onSubmit}>
            작성하기
          </button>
        </div>
      </Modal>
    </ModalContainer>
  );
};

export default ReviewWrite;
