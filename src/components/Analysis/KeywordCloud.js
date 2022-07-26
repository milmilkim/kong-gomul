import ReactWordcloud from "react-wordcloud";

const callbacks = {};
const options = {
  rotations: 2,
  rotationAngles: [0, 0],
  fontSizes: [11, 32],
  //   fontFamily: "impact",
};
const size = [600, 400];

const KeywordCloud = ({ words }) => {
  return <ReactWordcloud callbacks={callbacks} options={options} size={size} words={words} />;
};

export default KeywordCloud;
