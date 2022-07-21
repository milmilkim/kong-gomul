import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "../../config/axios";

import BooksThumb from "../../components/BooksThumb";
import ReviewThumb from "../../components/ReviewThumb";
import ReviewWrite from "../../components/ReviewWrite";

import { useDispatch, useSelector } from "react-redux";

import { getBookInfo } from "../../slices/BookInfoSlice";
import { getReviewListByBookId } from "../../slices/ReviewSlice";
import { addWishList, deleteWishList, getWishList } from "../../slices/WishSlice";

import Spinner from "../../components/spinner";

import StarRatings from "react-star-ratings";
import { useCallback, useRef } from "react";

import { FaPlus, FaBookmark } from "react-icons/fa";

import Meta from "../../Meta";

const BookInfoContainer = styled.div`
  padding: 30px 0;
  font-size: 14px;

  section {
    margin-bottom: 50px;

    .wish {
      text-align: center;
      margin-top: 20px;
      cursor: pointer;
      width: 150px;
      height: 50px;
      margin: auto;
      margin-top: 20px;

      @keyframes sizeUp {
        from {
          font-size: 1rem;
        }

        to {
          font-size: 1.1rem;
        }
      }
      &.active {
        animation: sizeUp 300ms ease;
        animation-fill-mode: forwards;

        color: ${(props) => props.theme.color.primaryColor};
      }
    }

    &.flex-row {
      .book-thumb {
        /* width: 30%; */
      }
      .book-text {
        padding-left: 60px;
        width: 100%;
        position: relative;
        line-height: 1.3;

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
          white-space: pre-line;
        }

        .keyword {
          display: inline-block;
          padding: 5px;
          background-color: #f2f2f2;
          border-radius: 5px;
          margin: 0 2px 5px 0;
          &::before {
            content: "#";
          }
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
        width: 25%;
        padding: 10px;
      }
    }
  }

  button {
    margin: 15px auto 0;
    display: block;
    width: 80px;
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

  //책 정보
  const { data, loading } = useSelector((state) => state.bookInfo);
  //하단에 표시될 리뷰
  const { data: reviewData, loading: loading2 } = useSelector((state) => state.review);
  const { isLogin } = useSelector((state) => state.auth);

  //보고싶어요
  const { data: wishList } = useSelector((state) => state.wish);

  //보고싶어요 추가되어있는지
  const [isAdded, setIsAdded] = useState(false);

  const handleButton = (e) => {
    setIsOpen((isOpen) => !isOpen);
  };

  const moveToWishList = useCallback(
    (e) => {
      if (isAdded) {
        //삭제
        dispatch(deleteWishList(id));
      } else {
        //추가
        dispatch(
          addWishList({
            book_id: id,
          })
        );
      }

      setIsAdded((isAdded) => !isAdded);
    },
    [isAdded, dispatch]
  );

  useEffect(() => {
    dispatch(getBookInfo({ id }));
    dispatch(getReviewListByBookId({ id, size: 4 }));
  }, [dispatch, id]);

  useEffect(() => {
    if (isLogin) {
      dispatch(getWishList());
    }
  }, [isLogin, dispatch]);

  useEffect(() => {
    if (wishList) {
      wishList.forEach((element) => {
        if (element.book_id === Number(id)) {
          setIsAdded(true);
        }
      });
    }
  }, [wishList]);

  return (
    <BookInfoContainer>
      <Spinner visible={loading || loading2} />
      {data && (
        <div className="inner">
          <Meta title={`콩고물 - ${data.title}`} />
          <section className="flex-row">
            {/* 책 섬네일 */}
            <div className="book-thumb">
              <BooksThumb
                size={"big"}
                thumbnail={data.thumbnail}
                category={data.category}
                title={data.title}
                author={data.authors.map((v) => v.name).join(", ")}
                publisher={data.publishers.map((v) => v.name).join(", ")}
              />
              {isLogin &&
                (isAdded ? (
                  <div className="wish active" onClick={moveToWishList}>
                    <FaBookmark />
                    보고싶어요
                  </div>
                ) : (
                  <div className="wish" onClick={moveToWishList}>
                    <FaPlus />
                    보고싶어요
                  </div>
                ))}
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
                {data.avg_rating ? data.avg_rating.toFixed(1) : 0}점 ({data.count_rating})
              </div>{" "}
              <h3>작품 소개</h3>
              <hr />
              <p>{data.introduce}</p>
              <h3>키워드</h3>
              <hr />
              <p>
                {data.keywords.map((v) => (
                  <span className="keyword"> {v.keyword} </span>
                ))}
              </p>
            </div>
          </section>
          {isLogin && (
            <button type="button" className="review-btn" onClick={handleButton}>
              리뷰 작성
            </button>
          )}
          <section className="review">
            <h3>리뷰</h3>
            <button type="button" className="review-btn">
              더보기
            </button>

            <ReviewWrite isOpen={isOpen} setIsOpen={setIsOpen} />
            <ul className="flex-row">
              {reviewData?.map((review) => (
                <li key={review.id}>
                  <ReviewThumb review={review} />
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
