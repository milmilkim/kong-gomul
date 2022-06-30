import React from "react";

import BooksThumb from "../../components/BooksThumb";

import styled from "styled-components";

const ReviewContainer = styled.div`
  padding: 30px 0;
  font-size: 14px;

  section {
    min-height: 400px;
    margin-bottom: 30px;
    &.flex-row {
      .book-thumb {
        width: 20%;
        text-align: center;

        .stars {
          margin: 15px 0;
        }
      }

      .book-review {
        padding-left: 60px;
        width: 80%;
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

        .button-container {
          position: absolute;
          bottom: 0;
          right: 0;

          button {
            margin: 15px auto 0;
            width: 80px;
            height: 30px;
            appearance: none;
            outline: none;
            border: none;
            background-color: #333;
            color: #eee;
            border-radius: 5px;
            cursor: pointer;
          }

          button:first-of-type {
            margin-right: 20px;
          }

          .writer {
            display: inline;
            margin-right: 80px;
            padding-bottom: 20px;
            position: relative;

            img {
              position: absolute;
              left: -70px;
              bottom: 0;
            }
          }
        }
      }
    }
  }
`;

const Review = () => {
  return (
    <ReviewContainer>
      <div className="inner">
        <section className="flex-row">
          <div className="book-thumb">
            <BooksThumb
              size={"small"}
              category={"카테고리명 테스트"}
              title={"타이틀 테스트"}
              author={"저자 테스트"}
              publisher={"출판사 테스트"}
            />
            <p className="stars">★★★★★</p>
          </div>
          <div className="book-review">
            <h3>리뷰제목리뷰제목</h3>
            <hr />
            <p>
              내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
            </p>
            <p>내용내용내용내용내용내용내용내용내용내용</p>
            <p>내용내용내용내용내용내용내용내용내용내용</p>
            <div className="button-container">
              <div className="writer">
                <img src="https://via.placeholder.com/60x60/cccccc/969696?text=" alt="프로필섬네일" />
                <span>작성자명</span>
              </div>
              <button type="button">좋아요</button>
              <button type="button">공유</button>
            </div>
          </div>
        </section>
      </div>
    </ReviewContainer>
  );
};

export default Review;
