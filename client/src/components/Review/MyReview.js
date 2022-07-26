import ProfileImage from "../ProfileImage";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { deleteReviewContents } from "../../slices/ReviewSlice";

const MyReview = ({ myReview }) => {
  const { book_id } = myReview;

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(!!myReview.contents);
  }, [myReview]);

  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.auth);

  const deleteReview = async (e) => {
    const result = await Swal.fire({ title: "정말 리뷰를 삭제할까요?", showCancelButton: true });
    if (result.isConfirmed) {
      try {
        dispatch(deleteReviewContents({ book_id }));
        setVisible(false);
      } catch (err) {
        Swal.fire(err.response.data.message);
      }
    }
  };

  return (
    <>
      {myReview.contents && visible && (
        <ReviewContainer>
          <ProfileImage src={info.profile_image} alt={info.nickname} />
          <span className="text">{myReview.contents}</span>
          <button onClick={deleteReview}>
            <FaTrashAlt />
            삭제
          </button>
        </ReviewContainer>
      )}
    </>
  );
};

const ReviewContainer = styled.div`
  max-width: 1000px;
  margin: auto;
  background-color: #fff;
  border: solid 1px #eee;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 10px 100px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-right: 10px;
  }

  span.text {
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  button {
    cursor: pointer;
    border: none;
    padding: 3px 10px;
  }
`;

export default MyReview;
