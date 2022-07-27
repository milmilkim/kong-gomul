import ReactStars from "react-rating-stars-component";
import axios from "../config/axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Star({ prevRating, book_id }) {
  const [rating, setRating] = useState(prevRating);
  const onStarChange = async (value) => {
    if (rating === value) {
      return;
    }
    try {
      setRating(value);
      await axios.post(`api/review/${book_id}`, { rating: value });
    } catch (err) {
      console.erorr(err);
      Swal.fire(err.response.data.message);
    }
  };

  const deleteRating = async () => {
    if (rating === null) {
      return;
    }
    try {
      await axios.post(`api/review/${book_id}`, { rating: null });
      setRating(null);
    } catch (err) {
      console.erorr(err);
      Swal.fire(err.response.data.message);
    }
  };

  const config = {
    size: 48,
    isHalf: true,
    a11y: true,
    activeColor: "rgb(255, 221, 99)",
    onChange: onStarChange,
    edit: true,
    value: rating,
  };

  const getComment = (rating) => {
    let comment = null;

    switch (rating) {
      case null:
        comment = "아직 평가가 없어요";
        break;
      case 5:
        comment = "최고예요!";
        break;
      case 4.5:
        comment = "훌륭해요";
        break;

      case 4.0:
        comment = "재미있어요";
        break;

      case 3.5:
        comment = "볼만해요";
        break;

      case 3.0:
        comment = "보통이에요";
        break;

      case 2.5:
        comment = "부족해요";
        break;

      case 2.0:
        comment = "별로예요";
        break;

      case 1.5:
        comment = "재미없어요";
        break;

      case 1.0:
        comment = "싫어요";
        break;

      case 0.5:
        comment = "최악이에요";
        break;

      default:
        comment = "";
    }

    return comment;
  };

  return (
    <>
      <span style={{ display: "block", color: "#b4b4b4" }}>{getComment(rating)}</span>
      <ReactStars {...config}>{rating}</ReactStars>
      <span style={{ cursor: "pointer" }} onClick={deleteRating}>
        취소
      </span>
    </>
  );
}
