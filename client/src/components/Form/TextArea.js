import styled from "styled-components";
import { useState } from "react";

const TextAreaCountainer = styled.div`
  textarea {
    border: 1px solid ${(props) => props.theme.color.borderColor};
    padding: 10px;
    margin-top: 10px;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    resize: none;
  }

  span.text_length {
    display: block;
    text-align: right;
    width: 100%;
  }
`;

const TextArea = ({ defaultValue, maxLength, width, height, placeholder, name }) => {
  const [textLength, setTextLength] = useState(defaultValue?.length || 0);

  const countTextLength = (e) => {
    setTextLength(e.target.value.length);
  };
  return (
    <TextAreaCountainer width={width} height={height}>
      <textarea
        maxLength={maxLength}
        placeholder={placeholder}
        defaultValue={defaultValue}
        name={name}
        onChange={countTextLength}
      />
      <span className="text_length">
        {textLength}/{maxLength}
      </span>
    </TextAreaCountainer>
  );
};

TextArea.defaultProps = {
  maxLenth: 240,
  width: "100%",
  height: "auto",
  placeholder: "",
};

export default TextArea;
