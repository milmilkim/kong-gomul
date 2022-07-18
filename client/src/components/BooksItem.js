/**
 * 책 리스트 아이템 컴포넌트
 */

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
/* Styled Components */
const BooksItemContainer = styled.li`
  width: ${(props) => props.itemWidth || "20%"};
  height: 100%;
  padding: 0 8px;
  margin-bottom: 1rem;

  a {
    width: 100%;

    .booksItemInner {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;

      .booksItemImage {
        width: 100%;
        height: 22rem;
        border: 1px solid #e9e9e9;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 0.5rem;

        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .booksItemTitle {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 0.375rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      span {
        margin-bottom: 0.375rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
`;

const BooksItem = ({ book: { book_id, thumbnail, title }, itemWidth, itemHref, children }) => {
  return (
    <BooksItemContainer itemWidth={itemWidth}>
      <Link to={itemHref || `/bookinfo/${book_id}`}>
        <div className="booksItemInner">
          <div className="booksItemImage">
            <img src={thumbnail} alt={title} />
          </div>
          {children}
        </div>
      </Link>
    </BooksItemContainer>
  );
};

export default BooksItem;
