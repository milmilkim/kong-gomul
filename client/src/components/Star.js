import ReactStars from "react-rating-stars-component";

export default function Star({ rating, setRating }) {
  const config = {
    size: 30,
    value: rating,
    isHalf: true,
    a11y: true,
    onChange: (newValue) => {
      console.log(`new value is ${newValue}`);
      setRating(newValue);
    },
  };

  return <ReactStars {...config} />;
}
