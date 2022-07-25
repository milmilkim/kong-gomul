import ProfileImage from "../ProfileImage";
import styled from "styled-components";
import axios from "../../config/axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

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

const MyReview = ({ myReview }) => {
  const { contents, book_id } = myReview;

  const [visible, setVisible] = useState(true);

  const { info } = useSelector((state) => state.auth);

  const deleteReview = async (e) => {
    const result = await Swal.fire({ title: "정말 리뷰를 삭제할까요?", showCancelButton: true });
    if (result.isConfirmed) {
      try {
        await axios.post("api/review/" + book_id, { contents: null });
        Swal.fire("삭제했어요", "", "success");
      } catch (err) {
        Swal.fire(err.response.data.message);
      } finally {
        setVisible(false);
      }
    }
  };

  return (
    <>
      {visible && (
        <ReviewContainer>
          <ProfileImage src={info.profile_image} alt={info.nickname} />
          <span className="text">{contents || "아직 작성된 글이 없어요"}</span>
          <button onClick={deleteReview}>
            <FaTrashAlt />
            삭제
          </button>
        </ReviewContainer>
      )}
    </>
  );
};

export default MyReview;
