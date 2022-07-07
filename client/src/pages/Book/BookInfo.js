import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

import BooksThumb from "../../components/BooksThumb";
import ReviewThumb from "../../components/ReviewThumb";
import ReviewWrite from "../../components/ReviewWrite";

import { useDispatch, useSelector } from "react-redux";
import { getBookInfo } from "../../slices/BookInfoSlice";

import Spinner from "../../components/spinner";

import StarRatings from "react-star-ratings";

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
  const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.bookInfo);

  const handleButton = (e) => {
    setIsOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    dispatch(getBookInfo({ id }));
  }, [dispatch, id]);

  return (
    <BookInfoContainer>
      <Spinner visible={loading} />
      {data && (
        <div className="inner">
          <section className="flex-row">
            {/* 책 섬네일 */}
            <div className="book-thumb">
              <BooksThumb
                size={"big"}
                thumbnail={data.thumbnail}
                category={data.category + " > " + data.genres.map((v) => v.genre).join(", ")}
                title={data.title}
                author={data.authors.map((v) => v.name).join(", ")}
                publisher={data.publishers.map((v) => v.name).join(", ")}
              />
              <button type="button">보고싶어요</button>
            </div>
            {/* 우측 책 소개 */}
            <div className="book-text">
              {/* 별점 */}
              <div className="stars">
                <StarRatings
                  rating={data.avg_rating || 0}
                  numberOfStars={5}
                  name="rating"
                  starDimension="13px"
                  starSpacing="2px"
                  starRatedColor="#FA722E"
                />
                {data.avg_rating}점 ({data.count_rating})
              </div>
              {/* 작품 소개, 출판사 서평 외 */}
              <h3>작품 소개</h3>
              <hr />
              <p>{data.introduce}</p>
              {/* <h3>출판사 서평</h3>
              <hr />
              <p>나중에 데이터 받아와서 넣을 내용</p>
              <h3>저자 프로필</h3>
              <hr />
              <p>나중에 데이터 받아와서 넣을 내용</p> */}
              <h3>키워드</h3>
              <hr />
              <p>#{data.keywords.map((v) => v.keyword).join(" #")}</p>
            </div>
          </section>
          <section className="review">
            <h3>리뷰</h3>
            <button type="button" className="review-btn" onClick={handleButton}>
              리뷰 작성
            </button>
            <ReviewWrite isOpen={isOpen} setIsOpen={setIsOpen} />
            <ul className="flex-row">
              {data.reviews.map((review) => (
                <li key={review.id}>
                  <Link to="/">
                    <ReviewThumb review={review} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </BookInfoContainer>
  );
};

export default BookInfo;
