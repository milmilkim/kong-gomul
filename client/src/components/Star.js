import ReactStars from "react-rating-stars-component";

export default function Star({ rating, onChange }) {
  const config = {
    size: 48,
    value: rating,
    isHalf: true,
    a11y: true,
    activeColor: "rgb(255, 221, 99)",
    onChange: onChange,
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
    }

    return comment;
  };

  return (
    <>
      <span style={{ display: "block", color: "#b4b4b4" }}>{getComment(rating)}</span>
      <ReactStars {...config} />
    </>
  );
}
