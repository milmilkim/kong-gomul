// 타이틀, 저자, 출판사와 함께 북 썸네일 표시
import React from "react";
import styled, { css } from "styled-components";

const BooksThumbContainer = styled.div`
  & > * {
    margin-bottom: 5px;
    text-align: center;
  }
  .category {
    text-align: left;
  }
  .title {
    font-weight: bold;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${(props) => {
    if (props.size === "big") {
      return css`
        .category {
          font-size: 14px;
        }
        .thumbnail {
          width: 195px;
        }
        .title {
          font-size: 20px;
          margin-bottom: 15px;
        }
        .author {
          font-size: 12px;
        }
        .publisher {
          font-size: 12px;
        }
      `;
    }
    if (props.size === "medium") {
      return css`
        .category {
          text-align: center;
          font-size: 12px;
        }
        .thumbnail {
          display: block;
          margin: 0 auto 12px;
          width: 160px;
        }
        .title {
          font-size: 16px;
          margin-bottom: 12px;
        }
        .author {
          font-size: 12px;
        }
        .publisher {
          font-size: 12px;
        }
        .star {
          font-size: 11px;
        }
      `;
    }

    if (props.size === "small") {
      return css`
        .category {
          text-align: center;
          font-size: 12px;
        }
        .thumbnail {
          display: block;
          margin: 0 auto 12px;
          width: 100px;
        }
        .title {
          font-size: 16px;
          margin-bottom: 12px;
        }
        .author {
          font-size: 12px;
        }
        .publisher {
          font-size: 12px;
        }
      `;
    }
  }}
`;

const BooksThumb = ({ size, thumbnail }) => {
  return (
    <BooksThumbContainer size={size} thumbnail={thumbnail}>
      <img src={thumbnail} alt="책 섬네일" className="thumbnail" />
    </BooksThumbContainer>
  );
};

BooksThumb.defaultProps = {
  size: "big",
  category: null,
  thumbnail: "https://via.placeholder.com/195x260",
  title: "타이틀",
  author: null,
  publisher: null,
  star: null,
};

export default BooksThumb;
