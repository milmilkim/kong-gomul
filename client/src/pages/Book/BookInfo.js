import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import BooksThumb from "../../components/BooksThumb";
import Review from "../../components/ReviewThumb";
import ReviewThumb from "../../components/ReviewThumb";

const BookInfoContainer = styled.div`
  padding: 30px 0;
  font-size: 14px;

  section {
    margin-bottom: 50px;

    &.flex-row {
      .book-thumb {
        /* width: 30%; */
      }
      .book-text {
        padding-left: 60px;
        width: 100%;
        position: relative;

        h3 {
          margin-top: 50px;
          font-size: 16px;
          font-weight: bold;
          &:nth-of-type(1) {
            margin-top: 20px;
          }
        }

        p {
          margin: 20px 0;
        }

        .stars {
          position: absolute;
          right: 0;
          top: 20px;
        }
      }
    }

    &.review {
      position: relative;

      h3 {
        margin-top: 50px;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: bold;
      }

      .review-btn {
        width: 70px;
        height: 25px;
        margin-top: 0;
        font-size: 12px;
        position: absolute;
        top: -6px;
        right: 0px;
        border-radius: 4px;
      }
    }

    ul.flex-row {
      overflow: hidden;
      li {
        margin-right: 20px;
      }
    }
  }

  button {
    margin: 15px auto 0;
    display: block;
    width: 80px;
    height: 30px;
    appearance: none;
    outline: none;
    border: none;
    background-color: #333;
    color: #eee;
    cursor: pointer;
  }
`;

const BookInfo = () => {
  return (
    <BookInfoContainer>
      <div className="inner">
        <section className="flex-row">
          {/* 책 섬네일 */}
          <div className="book-thumb">
            <BooksThumb
              size={"big"}
              category={"카테고리명 테스트"}
              title={"타이틀 테스트"}
              author={"저자 테스트"}
              publisher={"출판사 테스트"}
            />
            <button type="button">보고싶어요</button>
          </div>
          {/* 우측 책 소개 */}
          <div className="book-text">
            {/* 별점 */}
            <div className="stars">★★★★★</div>
            {/* 작품 소개, 출판사 서평 외 */}
            <h3>작품 소개</h3>
            <hr />
            <p>나중에 데이터 받아와서 넣을 내용</p>
            <h3>출판사 서평</h3>
            <hr />
            <p>나중에 데이터 받아와서 넣을 내용</p>
            <h3>저자 프로필</h3>
            <hr />
            <p>나중에 데이터 받아와서 넣을 내용</p>
          </div>
        </section>
        <section className="review">
          <h3>리뷰</h3>
          <button type="button" className="review-btn">
            리뷰 작성
          </button>
          {/* 리뷰 데이터 받아와서 대체 */}
          <ul className="flex-row">
            <li>
              <Link to="/">
                <ReviewThumb />
              </Link>
            </li>
            <li>
              <Link to="/">
                <ReviewThumb />
              </Link>
            </li>
            <li>
              <Link to="/">
                <ReviewThumb />
              </Link>
            </li>
            <li>
              <Link to="/">
                <ReviewThumb />
              </Link>
            </li>
            <li>
              <Link to="/">
                <ReviewThumb />
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </BookInfoContainer>
  );
};

export default BookInfo;
